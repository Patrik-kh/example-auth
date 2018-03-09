// @flow
import { send } from 'utils/requests'


export const loginUser = ( data: object ) => {
  // TODO: do not hardcode urls
  const args = {
    method: 'POST',
    url: '/api/api_token_auth/',
    body: data
  }
  return send( args )
}
