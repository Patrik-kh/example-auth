import { call, put } from 'redux-saga/effects'

import { verifyToken } from '../../api/verifyToken'
import { authenticateVerifyUser } from '../../sagas/verifyToken'
import { handleUserAuthSuccessfully } from '../../actions/userAuthHandling';


describe( 'authenticateVerifyUser Test Suite', () => {

  test( 'authenticateVerifyUser saga test', () => {

    const returnedData = {
      status: 200,
      user: 'Johnny Test Client',
      token: '123'
    }
    const gen = authenticateVerifyUser()

    const verifyTokenCall = call( verifyToken )
    const putFetchSuccess = put( handleUserAuthSuccessfully( returnedData ) )

    const getResponse = () => returnedData

    expect( gen.next( getResponse() ).value ).toEqual( verifyTokenCall )
    expect( gen.next( getResponse() ).value ).toEqual( putFetchSuccess )
    expect( gen.next().done ).toEqual( true )
    expect( localStorage.getItem( 'token' ) ).toEqual( returnedData.token )
  } )

  test( 'error handling in authenticateVerifyUser saga', () => {
    const gen = authenticateVerifyUser()
    const error = {
      body: 'An error was occured.'
    }
    const status = 400

    const verifyTokenCall = call( verifyToken )

    const getResponse = () => ( { status, error } )

    expect( gen.next( getResponse() ).value ).toEqual( verifyTokenCall )
    gen.throw( error )
    expect( window.location.href ).toEqual( '/auth/login/' )
  } )

} )
