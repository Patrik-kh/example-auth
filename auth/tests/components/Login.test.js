import React from 'react'
import { shallow } from 'enzyme'

import { Login } from '../../components/Login'


describe( 'Test Login component ', () => {

  it( 'default rendering', () => {
    const wrapper = shallow(
      <Login
        onSubmit={ () => {} }
        onChange={ () => {} }
        email='email@example.com'
        password=''
        error={ null }
      />
    )

    expect( wrapper.find( '.login' ).children().length ).toEqual( 3 )
    expect( wrapper.find( 'h5' ).text() ).toEqual( 'Order Management System' )
    expect( wrapper.find( 'form' ).children().length ).toEqual( 4 )
  } )

  it( 'error handling', () => {
    const aValue = 'abracabara'
    const wrapper = shallow(
      <Login
        onSubmit={ () => {} }
        onChange={ () => {} }
        email='email@example.com'
        password=''
        error={ aValue }
      />
    )

    expect( wrapper.find( '.auth-login__error' ).text() ).toEqual( aValue )
  } )

} )
