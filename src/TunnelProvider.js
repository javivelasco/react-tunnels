import PropTypes from 'prop-types'
import React, { Children, Component } from 'react'
import { TunnelContext } from './context'
import TunnelState from './TunnelState'

class TunnelProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  tunnelState = { tunnelState: new TunnelState() }

  render() {
    return (
      <TunnelContext.Provider value={this.tunnelState}>
        {Children.only(this.props.children)}
      </TunnelContext.Provider>
    )
  }
}

export default TunnelProvider
