/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

// HOST GROUPS
export type HostGroupsSuccessResponse = GizmoBaseResponse<
  Gizmo_SuccessResponse<
    {
      id: string
      name: string
      skinName: string
      applicationGroupId: string
      securityProfileId: string
      defaultGuestGroupId: string
    }[]
  >
>

// HOSTS
export type HostsSuccessResponse = GizmoBaseResponse<
  Gizmo_SuccessResponse<{
    id: number
    hostType: number
    hostGroupId: number | null
    number: number
    name: string | null
    isOutOfOrder: boolean
    isLocked: boolean
    iconId: number | null
    isDeleted: boolean
    hostComputer: {
      windowsName: string | null
      macAddress: string | null
    } | null
    hostEndpoint: {
      maximumUsers: number | null
    } | null
  }>
>

// USER SESSIONS
export type UserSessionsSuccessResponse = GizmoBaseResponse<
  {
    username: number | null
    userId: number
    span: number
    lastLogin: Date | null
    lastLogout: Date | null
    hostId: number
    hostName: string | null
    hostNumber: number
    userGroupName: string | null
    userGroupId: number | null
    hostGroupName: string | null
    hostGroupId: number | null
    sessionState: number
    slot: number
  }[]
>

interface Gizmo_SuccessResponse<T> {
  data: T
  nextCursor: string
  prevCursor: string
}

interface GizmoBaseResponse<T> {
  httpStatusCode: number
  isError: boolean
  message: string | null
  result: T
  version: string | null
}

export interface Gizmo_ErrorResponse {
  httpStatusCode: number
  message: string
  isError: boolean
  errorCodeType: number
  errorCodeTypeReadable: string
  errorCode: number
  errorCodeReadable: string
  errors: []
}
/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we time out the request.
   */
  timeout: number
}
