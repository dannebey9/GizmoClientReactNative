import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { HostGroupsSuccessResponse, HostsSuccessResponse } from "../services/api"
import { getRootStore } from "./helpers/getRootStore"
import { GizmoReq } from "../services/api/gizmoApi"

export const HostModel = types.model("Host", {
  id: types.number,
  hostType: types.number,
  hostGroupId: types.maybeNull(types.number),
  number: types.number,
  name: types.maybeNull(types.string),
  isOutOfOrder: types.boolean,
  isLocked: types.boolean,
  iconId: types.maybeNull(types.number),
  isDeleted: types.boolean,
  hostComputer: types.maybeNull(
    types.model("HostComputer", {
      windowsName: types.maybeNull(types.string),
      macAddress: types.maybeNull(types.string),
    }),
  ),
  hostEndpoint: types.maybeNull(
    types.model("HostEndpoint", {
      maximumUsers: types.number,
    }),
  ),
})

export const hostGroupModel = types.model("HostGroup", {
  id: types.number,
  name: types.string,
  skinName: types.maybeNull(types.string),
  applicationGroupId: types.maybeNull(types.number),
  securityProfileId: types.maybeNull(types.number),
  defaultGuestGroupId: types.maybeNull(types.number),
  hosts: types.array(HostModel),
})

export const ClubHostsModel = types
  .model("ClubHosts")
  .props({
    hostGroups: types.map(types.array(hostGroupModel)),
    hostGroupsStatus: types.optional(
      types.enumeration("hostGroupsStatus", ["idle", "pending", "done", "error"]),
      "idle",
    ),
    // hosts: types.map(types.array(HostModel)),
    hostsStatus: types.optional(
      types.enumeration("hostsStatus", ["idle", "pending", "done", "error"]),
      "idle",
    ),
    status: types.optional(
      types.enumeration("status", ["idle", "pending", "done", "error"]),
      "idle",
    ),
  })
  .actions((self) => ({
    getHostGroupFromApi: flow(function* () {
      try {
        self.hostGroupsStatus = "pending"
        const connection = getRootStore(self).connectionsStore.getSelectedConnection
        const response = yield GizmoReq<HostGroupsSuccessResponse>(connection, {
          method: "GET",
          endpoint: "v2.0/hostgroups",
        })
        self.hostGroups.set(connection.id, [])
        for (const group of response.result.data) {
          self.hostGroups.set(connection.id, [
            ...self.hostGroups.get(connection.id),
            { ...group, hosts: [] },
          ])
        }
        self.hostGroupsStatus = "done"
      } catch (error) {
        console.error(error)
        self.hostGroupsStatus = "error"
      } finally {
        self.hostGroupsStatus = "done"
      }
    }),
    getHostsFromApi: flow(function* () {
      try {
        self.hostsStatus = "pending"
        const connection = getRootStore(self).connectionsStore.getSelectedConnection
        const response = yield GizmoReq<HostsSuccessResponse>(connection, {
          method: "GET",
          endpoint: "v2.0/hosts",
        })
        // self.hosts.set(connection.id, [...response.result.data])
        for (const host of response.result.data) {
          const hostGroup = self.hostGroups
            .get(connection.id)
            ?.find((hg) => hg.id === host.hostGroupId)
          if (hostGroup) {
            hostGroup.hosts.push(host)
          } else {
            // console.warn(`Host ${host.id} has no hostGroup`)
          }
        }
        self.hostsStatus = "done"
      } catch (error) {
        console.error(error)
        self.hostsStatus = "error"
      } finally {
        self.hostsStatus = "done"
      }
    }),
  }))
  .actions((self) => ({
    fetchAll: flow(function* () {
      try {
        self.status = "pending"
        yield self.getHostGroupFromApi()
        yield self.getHostsFromApi()
        self.status = "done"
      } catch (error) {
        self.status = "error"
        console.error(error)
      } finally {
        self.status = "done"
      }
    }),
  }))
  .views((self) => ({
    get groupHostsFromSelectedConnection() {
      const connection = getRootStore(self).connectionsStore.getSelectedConnection
      return self.hostGroups.get(connection?.id)
    },
  }))

export interface ClubHosts extends Instance<typeof ClubHostsModel> {}
export interface ClubHostsSnapshotOut extends SnapshotOut<typeof ClubHostsModel> {}
export interface ClubHostsSnapshotIn extends SnapshotIn<typeof ClubHostsModel> {}
export const createClubHostsDefaultModel = () => types.optional(ClubHostsModel, {})
