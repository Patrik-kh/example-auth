// @flow
import React from 'react'

import { TextField } from 'common/components/TextField'
import { Button } from 'common/components/Button'

import * as styles from '../constants/styles'


type Props = {
  onSubmit: Function,
  onChange: Function,
  email: string,
  password: string,
  error: string
}


export const Login = ( props: Props ) => {
  return (
    <div className='container-login'>
      <div className='login'>
        <h1>omsy</h1>
        <h5>Order Management System</h5>
        <form>
          <span className='auth-login__error'>{ props.error }</span>
          <TextField
            id='login-email'
            type='email'
            inputClass='control'
            placeholderText='email'
            onChange={ e => props.onChange( 'email', e.target.value ) }
          ></TextField>
          <TextField
            id='login-password'
            placeholderText='password'
            type='password'
            onChange={ e => props.onChange( 'password', e.target.value ) }
            { ...styles.textInputsStyles }
          />
          <Button btnClass='btn login-btn' type='submit' onClick={ props.onSubmit }>Log in</Button>
        </form>
      </div>
    </div>
  )
}
