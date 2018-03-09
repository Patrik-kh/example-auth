// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { verifyTokenAction } from 'auth/actions/verifyToken'
import { Loader } from 'utils/components/loader'


type State = {
  isInProgress: boolean
}

type Props = {
  isAuthenticated: boolean,
  history: Object,
  verifyTokenAction: Function
}

export default function( WrappedComponent ) {

  const loginUrl = '/auth/login/'

  class Authentication extends Component<Props, State> {

    constructor( props ) {
      super( props )
      this.state = {
        isInProgress: false
      }
    }

    componentWillMount() {
      if ( !this.props.isAuthenticated ) {
        this.setState( {
          isInProgress: true
        }, () => this.props.verifyTokenAction() )
      }
    }

    componentWillReceiveProps( newProps ) {
      if ( newProps.isAuthenticated ) {
        return this.setState( {
          isInProgress: false
        } )
      } else {
        this.props.history.push( loginUrl )
      }
    }

    componentWillUpdate( nextProps ) {
      if ( !nextProps.isAuthenticated ) {
        this.props.history.push( loginUrl )
      }
    }

    render() {
      if ( this.state.isInProgress ) return <Loader/>
      return ( <WrappedComponent { ...this.props }/> )
    }

  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  const mapDispatchToProps = dispatch => ( {
    verifyTokenAction: bindActionCreators( verifyTokenAction, dispatch )
  } )

  return withRouter( connect( mapStateToProps, mapDispatchToProps )( Authentication ) )

}
