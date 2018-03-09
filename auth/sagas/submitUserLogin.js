//@flow
import { call, put, takeLatest } from 'redux-saga/effects'

import { loginUser } from '../api/loginUser'
import { AUTH_SUBMIT_LOGIN } from '../constants/actionTypes'
import {
  handleUserAuthSuccessfully, handleUserAuthError
} from '../actions/userAuthHandling'

export function* authenticateUser( action: Object ): Iterable<any> {
  try {
    const response = yield call( loginUser, action.data )
    yield put( handleUserAuthSuccessfully( response ) )
    if( response ) localStorage.setItem( 'token', response.token )
  } catch ( e ) {
    yield put( handleUserAuthError( e.body ) )
  }
}

export function* submitUserLogin(): Iterable<any> {
  yield takeLatest( AUTH_SUBMIT_LOGIN, authenticateUser )
}
