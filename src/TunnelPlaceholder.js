import PropTypes from 'prop-types'
import React, { createElement, Component, Fragment } from 'react'

class TunnelPlaceholder extends Component {
  static propTypes = {
    children: PropTypes.func,
    id: PropTypes.string.isRequired,
  }

  static contextTypes = {
    tunnelState: PropTypes.object,
  }

  componentDidMount() {
    const { id } = this.props
    const { tunnelState } = this.context
    tunnelState.subscribe(id, this.handlePropsChange)
  }

  componentWillUnmount() {
    const { id } = this.props
    const { tunnelState } = this.context
    tunnelState.unsubscribe(id, this.handlePropsChange)
  }

  handlePropsChange = () => {
    this.forceUpdate()
  }

  render() {
    const { tunnelState } = this.context
    const { id, children: renderChildren } = this.props
    const tunnelProps = tunnelState.getTunnelProps(id)

    if (Array.isArray(tunnelProps)) {
      if (renderChildren) {
        return createElement(renderChildren, { items: tunnelProps })
      }

      if (tunnelProps.length > 0) {
        return <Fragment>{tunnelProps.map(props => props.children)}</Fragment>
      }
    } else {
      if (renderChildren) {
        return createElement(renderChildren, tunnelProps || {})
      }

      if (!tunnelProps) {
        return null
      }

      return <Fragment>{tunnelProps.children}</Fragment>
    }

    return null
  }
}

export default TunnelPlaceholder
