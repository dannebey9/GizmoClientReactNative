/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import { _rootStore } from "../../models"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }
}

// Singleton instance of the API for convenience
export const api = new Api()

api.apisauce.addAsyncRequestTransform(async (request) => {
  console.log("request", request)
  request.auth = {
    username: _rootStore.connectionsStore.getSelectedConnection.username,
    password: _rootStore.connectionsStore.getSelectedConnection.password,
  }
  console.log("request", request)
  request.baseURL = `${_rootStore.connectionsStore.getSelectedConnection.protocol}://${_rootStore.connectionsStore.getSelectedConnection.address}:${_rootStore.connectionsStore.getSelectedConnection.port}/api`
})

api.apisauce.addMonitor((response) => {
  console.log("response", response.data)
  // console.log("response", response.config)
})
