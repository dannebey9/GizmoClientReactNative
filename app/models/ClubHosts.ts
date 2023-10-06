import { flow, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import {
  HostGroupsSuccessResponse,
  HostsSuccessResponse,
  UserSessionsSuccessResponse,
} from "../services/api"
import { getRootStore } from "./helpers/getRootStore"
import { GizmoReq } from "../services/api/gizmoApi"

export const UserSessionModel = types.model("UserSession", {
  username: types.maybeNull(types.string),
  userId: types.number,
  span: types.number,
  lastLogin: types.maybeNull(types.string),
  lastLogout: types.maybeNull(types.string),
  hostId: types.maybeNull(types.number),
  hostName: types.maybeNull(types.string),
  hostNumber: types.maybeNull(types.number),
  userGroupName: types.maybeNull(types.string),
  userGroupId: types.maybeNull(types.number),
  hostGroupName: types.maybeNull(types.string),
  hostGroupId: types.maybeNull(types.number),
  sessionState: types.number,
  slot: types.number,
})

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
  activeUserSessions: types.maybeNull(UserSessionModel),
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

const statusModel = types.optional(
  types.enumeration("status", ["idle", "pending", "done", "error"]),
  "idle",
)

export const ClubHostsModel = types
  .model("ClubHosts")
  .props({
    hostGroups: types.map(types.array(hostGroupModel)),
    hostGroupsStatus: statusModel,
    hostsStatus: statusModel,
    sessionsStatus: statusModel,
    status: statusModel,
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
        throw new Error(error)
      }
    }),
    getHostsFromApi: flow(function* () {
      try {
        self.hostsStatus = "pending"
        const connection = getRootStore(self).connectionsStore.getSelectedConnection
        const response = yield GizmoReq<HostsSuccessResponse>(connection, {
          method: "GET",
          endpoint: "v2.0/hosts",
          params: {
            "Pagination.Limit": 100,
          },
        })
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
        console.error("getHostsFromApi: ", error)
        self.hostsStatus = "error"
        throw new Error(error)
      }
    }),
    getUserSessionsFromApi: flow(function* () {
      try {
        self.sessionsStatus = "pending"
        const connection = getRootStore(self).connectionsStore.getSelectedConnection
        const response = yield GizmoReq<UserSessionsSuccessResponse>(connection, {
          method: "GET",
          endpoint: "usersessions/activeinfo",
        })
        // console.log(response.result)
        const hostGroups = self.hostGroups.get(connection.id)
        if (hostGroups) {
          for (const hostGroup of hostGroups) {
            for (const host of hostGroup.hosts) {
              const session = response.result.find((s) => s.hostId === host.id)
              if (session) {
                host.activeUserSessions = session
              }
            }
          }
        }
        self.sessionsStatus = "done"
        console.log(response)
      } catch (error) {
        console.error("getUserSessionsFromApi: ", error)
        self.sessionsStatus = "error"
        throw new Error(error)
      }
    }),
  }))
  .actions((self) => ({
    fetchAll: flow(function* () {
      try {
        self.status = "pending"
        yield self.getHostGroupFromApi()
        yield self.getHostsFromApi()
        yield self.getUserSessionsFromApi()
        self.status = "done"
      } catch (error) {
        self.status = "error"
        console.error("fetchAllClubHosts: ", error)
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
