import reducer from '../../reducers/reducer'
import * as types from '../../constants/actionTypes'


test( 'test default state', () => {
  expect( reducer( undefined, {} ) ).toEqual( { isAuthenticated: false } )
} )

test( 'test AUTH_USER_HANDLE_SUCCEEDED type', () => {
  const data = {
    user: 'Vasili',
    token: '123'
  }
  const resp = reducer( {}, {
    type: types.AUTH_USER_HANDLE_SUCCEEDED,
    data: data
  } )
  expect( resp.user ).toEqual( data.user )
  expect( resp.token ).toEqual( data.token )
  expect( resp.isAuthenticated ).toEqual( true )
} )

test( 'test AUTH_USER_HANDLE_FAILED type', () => {
  const resp = reducer( {}, {
    type: types.AUTH_USER_HANDLE_FAILED,
    error: {
      non_field_errors: [ 'atata' ]
    }
  } )
  expect( resp.error ).toEqual( 'atata' )
  expect( resp.isAuthenticated ).toEqual( false )
} )
