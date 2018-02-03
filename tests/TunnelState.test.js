import TunnelState from '../src/TunnelState'

const TUNNEL_ID = 'GroompyTunnel'
const ITEM_ID = 'GroompyItem'
const ITEM_ID2 = 'GroompyItem2'
const props = { message: 'Aihop!' }
const props2 = { message: 'Auhip!' }

describe('TunnelState', () => {
  it('calls listeners when setting props and there are listeners', () => {
    const state = new TunnelState()
    const listener = jest.fn()
    state.subscribe(TUNNEL_ID, listener)
    state.setTunnelProps(TUNNEL_ID, ITEM_ID, props)
    expect(listener).toHaveBeenCalledWith(props)
  })

  it('works when setting props and there are no listeners', () => {
    const state = new TunnelState()
    expect(() => {
      state.setTunnelProps(TUNNEL_ID, ITEM_ID, props)
    }).not.toThrow()
  })

  it('calls many listeners when setting props and there are many listeners', () => {
    const state = new TunnelState()
    const listener = jest.fn()
    const listener2 = jest.fn()
    state.subscribe(TUNNEL_ID, listener)
    state.subscribe(TUNNEL_ID, listener2)
    state.setTunnelProps(TUNNEL_ID, ITEM_ID, props)
    expect(listener).toHaveBeenCalledWith(props)
    expect(listener2).toHaveBeenCalledWith(props)
  })

  it('unsubscribe a listener keeping other listeners', () => {
    const state = new TunnelState()
    const listener = jest.fn()
    const listener2 = jest.fn()
    state.subscribe(TUNNEL_ID, listener)
    state.subscribe(TUNNEL_ID, listener2)
    state.setTunnelProps(TUNNEL_ID, ITEM_ID, props)
    state.unsubscribe(TUNNEL_ID, listener)
    state.setTunnelProps(TUNNEL_ID, ITEM_ID, props)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener2).toHaveBeenCalledTimes(2)
  })

  it('allows to retrieve props for a tunnel', () => {
    const state = new TunnelState()
    state.setTunnelProps(TUNNEL_ID, ITEM_ID, props)
    expect(state.getTunnelProps(TUNNEL_ID)).toEqual(props)
  })

  it('allows to retrieve an array of props when there are multiple items', () => {
    const state = new TunnelState()
    state.setTunnelProps(TUNNEL_ID, ITEM_ID, props)
    state.setTunnelProps(TUNNEL_ID, ITEM_ID2, props2)
    expect(state.getTunnelProps(TUNNEL_ID)).toEqual([props, props2])
  })
})
