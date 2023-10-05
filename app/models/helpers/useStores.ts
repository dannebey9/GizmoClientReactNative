import { createContext, useContext, useEffect, useState } from "react"
import { RootStore, RootStoreModel } from "../RootStore"
import { setupRootStore } from "./setupRootStore"

/**
 * Создайте здесь начальный (пустой) глобальный экземпляр RootStore.
 *
 * Позже он будет повторно сохранен в app.tsx с помощью функции setupRootStore.
 *
 * Если ваш RootStore требует создания экземпляров определенных свойств,
 * Вы можете сделать это здесь.
 *
 * Если ваш RootStore имеет _тонну_ дочерних магазинов и свойств (дерево
 * очень большой), возможно, вы захотите использовать другую стратегию, чем сейчас
 * создание его экземпляра, хотя это должно быть редко.
 */
export const _rootStore = RootStoreModel.create({})

/**
 * The RootStoreContext provides a way to access
 * the RootStore in any screen or component.
 */
const RootStoreContext = createContext<RootStore>(_rootStore)

/**
 * You can use this Provider to specify a *different* RootStore
 * than the singleton version above if you need to. Generally speaking,
 * this Provider & custom RootStore instances would only be used in
 * testing scenarios.
 */
export const RootStoreProvider = RootStoreContext.Provider

/**
 * A hook that screens and other components can use to gain access to
 * our stores:
 *
 * const rootStore = useStores()
 *
 * or:
 *
 * const { someStore, someOtherStore } = useStores()
 */
export const useStores = () => useContext(RootStoreContext)

/**
 * Used only in the app.tsx file, this hook sets up the RootStore
 * and then rehydrates it. It connects everything with Reactotron
 * and then lets the app know that everything is ready to go.
 */
export const useInitialRootStore = (callback: () => void | Promise<void>) => {
  const rootStore = useStores()
  const [rehydrated, setRehydrated] = useState(false)

  // Kick off initial async loading actions, like loading fonts and rehydrating RootStore
  useEffect(() => {
    let _unsubscribe
    ;(async () => {
      // set up the RootStore (returns the state restored from AsyncStorage)
      const { unsubscribe } = await setupRootStore(rootStore)
      _unsubscribe = unsubscribe

      // reactotron integration with the MST root store (DEV only)
      if (__DEV__) {
        console.tron.trackMstNode(rootStore)
      }

      // let the app know we've finished rehydrating
      setRehydrated(true)

      // invoke the callback, if provided
      if (callback) callback()
    })()

    return () => {
      // cleanup
      if (_unsubscribe) _unsubscribe()
    }
  }, [])

  return { rootStore, rehydrated }
}
