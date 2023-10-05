import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const AppSettingsModel = types
  .model("AppSettings")
  .props({
    welcomeScreenViewed: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AppSettings extends Instance<typeof AppSettingsModel> {}
export interface AppSettingsSnapshotOut extends SnapshotOut<typeof AppSettingsModel> {}
export interface AppSettingsSnapshotIn extends SnapshotIn<typeof AppSettingsModel> {}
export const createAppSettingsDefaultModel = () => types.optional(AppSettingsModel, {})
