import PropTypes from 'prop-types'
import { Children, Component } from 'react'
import TunnelState from './TunnelState'

class TunnelProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static childContextTypes = {
    tunnelState: PropTypes.object,
  }

  tunnelState = new TunnelState()

  getChildContext() {
    return {
      tunnelState: this.tunnelState,
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default TunnelProvider
