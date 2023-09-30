import { ConnectionsModel } from "./Connections"

test("can be created", () => {
  const instance = ConnectionsModel.create({})

  expect(instance).toBeTruthy()
})
