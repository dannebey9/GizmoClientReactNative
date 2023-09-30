import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ConnectionsModel } from "./Connections"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  connections: types.optional(ConnectionsModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
