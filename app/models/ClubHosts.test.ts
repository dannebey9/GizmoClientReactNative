import { ClubDevicesModel } from "./ClubHosts"

test("can be created", () => {
  const instance = ClubDevicesModel.create({})

  expect(instance).toBeTruthy()
})
