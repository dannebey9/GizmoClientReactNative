import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios"
import { ConnectionType } from "../../models"
import Base64 from "../../utils/Base64"

interface RequestOptions<T = any> {
  endpoint: string
  method?: Method
  data?: T
  headers?: Record<string, string>
  params?: Record<string, any>
  timeout?: number
  validateStatus?: (status: number) => boolean
}

export const GizmoReq = async <T = any>(
  connection: ConnectionType,
  options: RequestOptions<T>,
): Promise<T> => {
  const baseURL = `${connection.protocol}://${connection.address}:${connection.port}/api`
  const url = `${baseURL}/${options.endpoint}`

  const config: AxiosRequestConfig = {
    method: options.method || "GET",
    url,
    data: options.data,
    params: options.params,
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${Base64.btoa(`${connection.username}:${connection.password}`)}`,
    },
    timeout: options.timeout || 5000,
    validateStatus: options.validateStatus || ((status) => status >= 200 && status < 300),
  }

  try {
    const response: AxiosResponse<T> = await axios(config)
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Server responded with status ${error.response.status}: ${error.response.data}`,
      )
    } else if (error.request) {
      throw new Error("No response received from server.")
    } else {
      throw new Error(`Request error: ${error.message}`)
    }
  }
}
