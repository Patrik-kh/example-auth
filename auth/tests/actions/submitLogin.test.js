import { AUTH_SUBMIT_LOGIN } from '../../constants/actionTypes'
import { submitLogin } from '../../actions/submitLogin'


test( 'Get data and type correctly', () => {
  const gone = 'Gone Forever'
  const submitAction = submitLogin( gone )
  expect( submitAction.type ).toEqual( AUTH_SUBMIT_LOGIN )
  expect( submitAction.data ).toEqual( gone )
} )
