import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { nanoid } from "nanoid"

export const ConnectionModel = types.model("Connection", {
  id: types.identifier,
  address: types.string,
  port: types.string,
  name: types.string,
  username: types.string,
  password: types.string,
})

export type ConnectionType = Instance<typeof ConnectionModel>

export const ConnectionsModel = types
  .model("Connections")
  .props({
    connections: types.optional(types.array(ConnectionModel), []),
    selectedConnection: types.maybe(types.reference(ConnectionModel)),
  })
  .actions((self) => ({
    addConnection(connection: Omit<SnapshotIn<typeof ConnectionModel>, "id">) {
      self.connections.push({ ...connection, id: nanoid() })
    },
    updateConnection(id: string, newConnection: SnapshotIn<typeof ConnectionModel>) {
      const connectionToUpdate = self.connections.find((c) => c.id === id)
      if (connectionToUpdate) {
        Object.assign(connectionToUpdate, newConnection)
      }
    },
    deleteConnection(id: string) {
      const index = self.connections.findIndex((c) => c.id === id)
      if (index !== -1) {
        self.connections.splice(index, 1)
      }
    },
    selectConnection(id: string) {
      const connectionToSelect = self.connections.find((c) => c.id === id)
      if (connectionToSelect) {
        self.selectedConnection = connectionToSelect
      }
    },
    // TODO: проверка доступности подключения
    async checkConnectionAvailability(id: string) {
      const connection = self.connections.find((c) => c.id === id)
      if (connection) {
        // TODO: проверка доступности подключения
      }
      return false
    },
  }))

export interface Connections extends Instance<typeof ConnectionsModel> {}
export interface ConnectionsSnapshotOut extends SnapshotOut<typeof ConnectionsModel> {}
export interface ConnectionsSnapshotIn extends SnapshotIn<typeof ConnectionsModel> {}
