// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router'

import { Login } from '../components/Login'
import { ERROR_EMPTY_FIELDS } from '../constants/errors'
import { submitLogin } from '../actions/submitLogin'


type Props = {
  submitLogin: Function,
  isAuthenticated: boolean,
  error: string
}

type State = {
  error: string,
  email: string,
  password: string
}


export class LoginWrapper extends Component<Props, State> {

  fields: Array<string>
  onSubmit: Function
  onChange: Function

  constructor( props: Props ) {
    super( props )
    this.state = {
      email: '',
      password: '',
      error: ''
    }
    // fields for the form
    this.fields = ['email', 'password']
    this.onSubmit = this.onSubmit.bind( this )
    this.onChange = this.onChange.bind( this )
  }

  onSubmit( event ) {
    event.preventDefault()
    if ( !this.state.email && !this.state.password ) {
      return this.setState( { error: ERROR_EMPTY_FIELDS } )
    }
    this.props.submitLogin( {
      email: this.state.email,
      password: this.state.password
    } )
  }

  onChange( fieldName: string, value: string ) {
    if ( !this.fields.includes( fieldName ) ) return false
    this.setState( {
      [ fieldName ]: value,
      error: ''
    } )
  }

  render() {
    if ( this.props.isAuthenticated ) {
      return (
        <Redirect to='/'/>
      )
    }
    return (
      <Login
        { ...this.state }
        { ...this.props }
        error={ this.state.error || this.props.error }
        onChange={ this.onChange }
        onSubmit={ this.onSubmit }
      />
    )
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated || false,
    error: state.auth.error || ''
  }
}

const mapDispatchToProps = dispatch => ( {
  submitLogin: bindActionCreators( submitLogin, dispatch )
} )


export const LoginContainer = connect(
  mapStateToProps, mapDispatchToProps
)( LoginWrapper )
