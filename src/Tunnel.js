import { Component } from 'react'
import PropTypes from 'prop-types'
import uniqueId from './uniqueId'
import { TunnelContext } from './context'

class Tunnel extends Component {
  static propTypes = {
    id: PropTypes.string,
    render: PropTypes.func,
  }

  static contextType = TunnelContext

  itemId = uniqueId()

  componentDidMount() {
    this.setTunnelProps(this.props)
  }

  componentDidUpdate() {
    this.setTunnelProps(this.props)
  }

  componentWillUnmount() {
    const { id } = this.props
    const { tunnelState } = this.context
    tunnelState.setTunnelProps(id, this.itemId, null)
  }

  setTunnelProps(newProps) {
    const { id, ...props } = newProps
    const { tunnelState } = this.context
    tunnelState.setTunnelProps(id, this.itemId, props)
  }

  render() {
    return null
  }
}

export default Tunnel
