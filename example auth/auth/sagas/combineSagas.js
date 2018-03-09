import { submitUserLogin } from './submitUserLogin'
import { verifyUserToken } from './verifyToken'


export const authSagas = [
  submitUserLogin(),
  verifyUserToken()
]
