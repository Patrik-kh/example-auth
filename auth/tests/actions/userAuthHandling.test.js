import {
  AUTH_USER_HANDLE_SUCCEEDED, AUTH_USER_HANDLE_FAILED
} from '../../constants/actionTypes'
import { handleUserAuthSuccessfully, handleUserAuthError } from '../../actions/userAuthHandling'


test( 'handle user data successfully', () => {
  const data = 'break'
  const handleUserSuccessResp = handleUserAuthSuccessfully( data )
  expect( handleUserSuccessResp.type ).toEqual( AUTH_USER_HANDLE_SUCCEEDED )
  expect( handleUserSuccessResp.data ).toEqual( data )
} )

test( 'handle user data with error', () => {
  const error = 'an error'
  const handleUserErrorResp = handleUserAuthError( error )
  expect( handleUserErrorResp.type ).toEqual( AUTH_USER_HANDLE_FAILED )
  expect( handleUserErrorResp.error ).toEqual( error )
} )
