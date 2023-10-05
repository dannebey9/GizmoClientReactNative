import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ConnectionsModel } from "./Connections"
import { AppSettingsModel } from "./AppSettings"
import { ClubHostsModel } from "./ClubHosts"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  connectionsStore: types.optional(ConnectionsModel, {}),
  appSettingsStore: types.optional(AppSettingsModel, {}),
  clubHostsStore: types.optional(ClubHostsModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
