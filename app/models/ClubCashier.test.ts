import { ClubCashierModel } from "./ClubCashier"

test("can be created", () => {
  const instance = ClubCashierModel.create({})

  expect(instance).toBeTruthy()
})
