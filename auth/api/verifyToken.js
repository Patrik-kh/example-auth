import { send } from 'utils/requests'


export const verifyToken = () => {
  const token = localStorage.getItem( 'token' )
  const args = {
    url: '/api/api_token_verify/',
    body: { token },
    method: 'POST'
  }
  return send( args )
}
