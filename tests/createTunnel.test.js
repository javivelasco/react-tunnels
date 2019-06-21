import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import PropTypes from 'prop-types'
import { TunnelProvider, createTunnel } from '../src'

configure({ adapter: new Adapter() })

const props = { message: 'Aihop!' }
const Msg = ({ message }) => <div className="msg">{message}</div>
Msg.propTypes = { message: PropTypes.string }

describe('createTunnel', () => {
  it('should render a tunnel passing children', () => {
    const { TunnelPlaceholder, Tunnel } = createTunnel()

    const wrapper = mount(
      <TunnelProvider>
        <div>
          <TunnelPlaceholder />
          <Tunnel>
            <Msg message={props.message} />
          </Tunnel>
        </div>
      </TunnelProvider>,
    )
    assertTunnelPlaceholderContent(wrapper, props.message)
  })

  it('can not accidently override id', () => {
    const { TunnelPlaceholder, Tunnel } = createTunnel()

    const wrapper = mount(
      <TunnelProvider>
        <div>
          <TunnelPlaceholder id="foo" />
          <Tunnel id="bar">
            <Msg message={props.message} />
          </Tunnel>
        </div>
      </TunnelProvider>,
    )
    assertTunnelPlaceholderContent(wrapper, props.message)
  })

  function assertTunnelPlaceholderContent(wrapper, expectedContent) {
    expect(wrapper.find(Msg).text()).toEqual(expectedContent)
  }
})
