//@flow
import { call, put, takeLatest } from 'redux-saga/effects'

import { verifyToken } from '../api/verifyToken'
import { AUTH_VERIFY_TOKEN } from '../constants/actionTypes'
import { handleUserAuthSuccessfully } from '../actions/userAuthHandling'


export function* authenticateVerifyUser() {
  try {
    const response = yield call( verifyToken )
    yield put( handleUserAuthSuccessfully( response ) )
    localStorage.setItem( 'token', response.token )
  } catch ( e ) {
    window.location.href = '/auth/login/'
    yield put( { type: 'HANDLE_GET_ERROR', body: e } )
  }
}

export function* verifyUserToken() {
  yield takeLatest( AUTH_VERIFY_TOKEN, authenticateVerifyUser )
}
