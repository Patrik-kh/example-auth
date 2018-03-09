import { call, put } from 'redux-saga/effects'

import { loginUser } from '../../api/loginUser'
import { authenticateUser } from '../../sagas/submitUserLogin'
import { handleUserAuthSuccessfully, handleUserAuthError } from '../../actions/userAuthHandling';


describe( 'authenticateUser Test Suite', () => {

  const data = {
    email: 'email',
    password: 'pass'
  }

  test( 'authenticateUser saga test', () => {

    const returnedData = {
      status: 200,
      user: 'Johnny',
      token: '123'
    }
    const gen = authenticateUser( { data } )

    const loginCall = call( loginUser, data )
    const putHandleSuccess = put( handleUserAuthSuccessfully( returnedData ) )

    const getResponse = () => returnedData

    expect( gen.next( getResponse() ).value ).toEqual( loginCall )
    expect( gen.next( getResponse() ).value ).toEqual( putHandleSuccess )
    expect( gen.next().done ).toEqual( true )
    expect( localStorage.getItem( 'token' ) ).toEqual( returnedData.token )
  } )

  test( 'error handling in authenticateUser saga', () => {
    const gen = authenticateUser( { data } )
    const error = {
      body: 'An error was occured.'
    }
    const status = 400

    const loginCall = call( loginUser, data )
    const putError = put( handleUserAuthError( error.body ) )

    const getResponse = () => ( { status, error } )

    expect( gen.next( getResponse() ).value ).toEqual( loginCall )
    expect( gen.throw( error ).value ).toEqual( putError )
  } )

} )
