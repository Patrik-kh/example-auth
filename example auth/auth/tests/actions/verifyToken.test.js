import { AUTH_VERIFY_TOKEN } from '../../constants/actionTypes'
import { verifyTokenAction } from '../../actions/verifyToken'


test( 'Get data and type correctly', () => {
  const verifyTokenVal = verifyTokenAction()
  expect( verifyTokenVal.type ).toEqual( AUTH_VERIFY_TOKEN )
} )
