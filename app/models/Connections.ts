import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const ConnectionModel = types.model("Connection", {
  ip: types.string,
  port: types.number,
  name: types.string,
  username: types.string,
  password: types.string,
})

export const ConnectionsModel = types
  .model("Connections", {
    connections: types.array(ConnectionModel),
    selectedConnection: types.maybe(types.reference(ConnectionModel)),
  })
  .actions((self) => ({
    addConnection(connection: SnapshotIn<typeof ConnectionModel>) {
      self.connections.push(connection)
    },
    updateConnection(name: string, newConnection: SnapshotIn<typeof ConnectionModel>) {
      const connectionToUpdate = self.connections.find((c) => c.name === name)
      if (connectionToUpdate) {
        Object.assign(connectionToUpdate, newConnection)
      }
    },
    deleteConnection(name: string) {
      const index = self.connections.findIndex((c) => c.name === name)
      if (index !== -1) {
        self.connections.splice(index, 1)
      }
    },
    selectConnection(name: string) {
      const connectionToSelect = self.connections.find((c) => c.name === name)
      if (connectionToSelect) {
        self.selectedConnection = connectionToSelect
      }
    },
    // TODO: проверка доступности подключения
    async checkConnectionAvailability(name: string) {
      const connection = self.connections.find((c) => c.name === name)
      if (connection) {
        // TODO: проверка доступности подключения
      }
      return false
    },
  }))

export interface Connections extends Instance<typeof ConnectionsModel> {}
export interface ConnectionsSnapshotOut extends SnapshotOut<typeof ConnectionsModel> {}
export interface ConnectionsSnapshotIn extends SnapshotIn<typeof ConnectionsModel> {}
