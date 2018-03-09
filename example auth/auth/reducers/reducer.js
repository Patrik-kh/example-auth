import {
  AUTH_USER_HANDLE_SUCCEEDED, AUTH_USER_HANDLE_FAILED
} from '../constants/actionTypes'


const defaultStore = {
  isAuthenticated: false
}

export default ( state = defaultStore, action ) => {
  switch ( action.type ) {
    case AUTH_USER_HANDLE_SUCCEEDED:
      return Object.assign( {}, state, {
        user: action.data.user,
        token: action.data.token,
        isAuthenticated: true
      } )
    case AUTH_USER_HANDLE_FAILED:
      return Object.assign( {}, state, {
        isAuthenticated: false,
        error: action.error.non_field_errors[0]
      } )
    default:
      return state
  }
}
