# React Tunnels 🚇 [![npm](https://img.shields.io/npm/v/react-tunnels.svg?style=flat)](https://www.npmjs.org/package/react-tunnels)

Render React components in placeholders that are placed somewhere else in the component tree.

## Install

```
yarn add react-tunnels
```

### Why

There is a common use case in React apps where you want to define a `Layout` where the content of some elements are defined by child components. For example, you want define `Layout` just once and reuse it for every page but it has a breadcrumb whose steps depend on children components. This tiny library allows you to define "tunnels" to render from a element to whatever other element in the app, even elements on top of the tree. It's like `Portal` but the target is a component instead of a DOM element.

### Usage

Define a `TunnelPlaceholder` identified by an `id` and decide what properties are going to be passed to its render function by defining `Tunnel` components with the same id anywhere else in the app. If you define just a single `Tunnel` its props will be passed, if there are more than once tunnel for an `id`, the tunnel will receive an array of `props`. Let's see some examples.

### Simple example: tunneling children

Define a placeholder without any render function so it will render any children coming from `Tunnel` components.

```jsx
import { TunnelsProvider, TunnelPlaceholder, Tunnel } from 'preact-slots'

render(
  <TunnelsProvider>
    <div>
      <TunnelPlaceholder id="my-tunnel" />
      <Tunnel id="my-tunnel">
        This will be rendered on the placeholder 👆
      </Tunnel>
    </div>
  </TunnelsProvider>
)
```

### A more complex example: building a Breadcrumb

```jsx
render(
  <TunnelsProvider>
    {/* This will render the breadcrumb */}
    <Breadcrumbs />
    {/* Somewhere else in children */}
    <Breadcrumb url="/products">Products</Breadcrumb>
    <Breadcrumb url="/products/123">Product <strong>123</strong></Breadcrumb>
  </TunnelsProvider>
)

const Breadcrumbs = () => (
  <TunnelPlaceholder id="breadcrumb">
    {({ items = [] }) => (
      <ul>
        {items.map(({ children, href }) => (
          <li><a href={href}>{children}</a></li>
        ))}
      </ul>
    )}
  </TunnelPlaceholder>
)

const Breadcrumb = ({ children, url }) => (
  <Tunnel id="breadcrumb" url={url}>
    {children}
  </Tunnel>
)
```

### Similar Libraries

- [React Slot Fill](https://github.com/camwest/react-slot-fill): [@camwest](https://github.com/camwest) has built a similar project but with a different API and a bit more limited use cases. The main difference is that you can't pass content to a placeholder from multiple entry points while react-tunnels does it by passing an array with the props defined by each tunnel to the render function of the placeholder. For simple cases, it is pretty similar.
- [Preact Slots](https://github.com/developit/preact-slots): A library similar to React Slot Fill but for [Preact](https://github.com/developit/preact) developed by [Jason Miller](https://twitter.com/_developit).

## License

This project is licensed under the terms of the [MIT license](https://github.com/javivelasco/react-tunnels/blob/master/LICENSE).
