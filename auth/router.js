import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { LoginContainer } from './containers/LoginContainer'


export const Auth = () => (
  <Switch>
    <Route path='/auth/login' component={ LoginContainer }/>
    <Route
      path='/auth/forgot_password'
      component={ () => ( <div>Forgot</div> ) }
    />
    <Route component={ () => ( <div>404 Error</div> ) }/>
  </Switch>
)
