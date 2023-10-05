import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import "react-native-get-random-values"
import { nanoid } from "nanoid"

export enum Protocol {
  HTTP = "http",
  HTTPS = "https",
}

export const ConnectionModel = types.model("Connection", {
  id: types.identifier,
  address: types.string,
  port: types.string,
  name: types.string,
  username: types.string,
  password: types.string,
  protocol: types.enumeration(Object.values(Protocol)),
})

export type ConnectionType = Instance<typeof ConnectionModel>

export const ConnectionsModel = types
  .model("Connections")
  .props({
    connections: types.optional(types.array(ConnectionModel), []),
    selectedConnection: types.maybe(types.reference(ConnectionModel)),
  })
  .views((self) => ({
    get connectionFromId() {
      return (id: string) => self.connections.find((c) => c.id === id)
    },
    get getSelectedConnection() {
      return self.connections.find((c) => c.id === self.selectedConnection?.id)
    },
  }))
  .actions((self) => ({
    addConnection(connection: Omit<SnapshotIn<typeof ConnectionModel>, "id">) {
      console.warn("addConnection", connection)
      const newConnection = ConnectionModel.create({
        ...connection,
        id: nanoid(),
      })
      self.connections.replace(self.connections.concat(newConnection))
      // self.connections.push(newConnection)
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
    deselectConnection() {
      self.selectedConnection = undefined
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
