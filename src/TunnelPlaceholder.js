import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'

class TunnelPlaceholder extends Component {
  static propTypes = {
    children: PropTypes.func,
    component: PropTypes.func,
    id: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
  }

  static defaultProps = {
    component: Fragment,
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
    const {
      id,
      children: renderChildren,
      component: Tag,
      multiple,
    } = this.props
    const tunnelProps = tunnelState.getTunnelProps(id)

    if (renderChildren) {
      if (Array.isArray(tunnelProps) || multiple) {
        return !tunnelProps
          ? renderChildren({ items: [] })
          : renderChildren({
              items: Array.isArray(tunnelProps) ? tunnelProps : [tunnelProps],
            })
      } else {
        return renderChildren(tunnelProps || {})
      }
    }

    if (!tunnelProps) {
      return null
    }

    return <Tag>{tunnelProps.children}</Tag>
  }
}

export default TunnelPlaceholder
