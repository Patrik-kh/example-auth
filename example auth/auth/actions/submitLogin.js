import { AUTH_SUBMIT_LOGIN } from '../constants/actionTypes'


export function submitLogin( data ) {
  return {
    type: AUTH_SUBMIT_LOGIN,
    data: data
  }
}
