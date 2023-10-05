import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ClubCashierModel = types
  .model("ClubCashier")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ClubCashier extends Instance<typeof ClubCashierModel> {}
export interface ClubCashierSnapshotOut extends SnapshotOut<typeof ClubCashierModel> {}
export interface ClubCashierSnapshotIn extends SnapshotIn<typeof ClubCashierModel> {}
export const createClubCashierDefaultModel = () => types.optional(ClubCashierModel, {})
