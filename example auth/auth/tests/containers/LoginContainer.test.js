import React from 'react'
import { shallow } from 'enzyme'

import { LoginWrapper } from '../../containers/LoginContainer'
import { ERROR_EMPTY_FIELDS } from '../../constants/errors';


describe( 'Test Login Container (wrapper)', () => {

  let wrapper
  let mockFn = jest.fn()

  beforeEach( () => {
    wrapper = shallow(
      <LoginWrapper
        submitLogin={ mockFn }
        isAuthenticated={ false }
      />
    )
  } )

  test( 'Default rendering of Login comp', () => {
    expect( wrapper.find( 'Login' ).exists() ).toEqual( true )
  } )

  test( 'Check empty fields error', () => {
    const preventDefaultMockFn = jest.fn()
    wrapper.simulate( 'submit', { preventDefault: preventDefaultMockFn } )

    expect( wrapper.state( 'error' ) ).toEqual( ERROR_EMPTY_FIELDS )
  } )

  test( 'Submit function', () => {
    const preventDefaultMockFn = jest.fn()

    wrapper.setState( {
      email: 'vasya@petya.com',
      password: '12345678'
    } )
    
    wrapper.simulate( 'submit', { preventDefault: preventDefaultMockFn } )

    expect( mockFn ).toHaveBeenCalled()
  } )

  test( 'test onChange value', () => {
    let changeValue = 'valka';
    wrapper.instance().onChange( 'email', changeValue )

    expect( wrapper.state( 'email' ) ).toEqual( changeValue )
  } )

  test( 'test onChange value', () => {
    let changeValue = 'Tolik'
    wrapper.instance().onChange( 'title', changeValue )

    expect( wrapper.state( 'title' ) ).not.toEqual( changeValue )
  } )

  test( 'test redirect for not auth', () => {
    // TODO: find out how to mock router's Redirect in the future
    wrapper.setProps( { isAuthenticated: true } )

    expect( wrapper.find( 'Login' ).exists() ).toEqual( false )
  } )

})
