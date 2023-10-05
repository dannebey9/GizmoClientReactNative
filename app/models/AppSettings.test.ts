import { AppSettingsModel } from "./AppSettings"

test("can be created", () => {
  const instance = AppSettingsModel.create({})

  expect(instance).toBeTruthy()
})
