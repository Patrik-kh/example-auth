// @flow
import {
  AUTH_USER_HANDLE_SUCCEEDED, AUTH_USER_HANDLE_FAILED
} from '../constants/actionTypes'


export function handleUserAuthSuccessfully( data: object ) {
  return {
    type: AUTH_USER_HANDLE_SUCCEEDED,
    data: data
  }
}

export function handleUserAuthError( error: object ) {
  return {
    type: AUTH_USER_HANDLE_FAILED,
    error: error
  }
}
