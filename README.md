# React Tunnels 🚇 [![npm](https://img.shields.io/npm/v/react-tunnels.svg?style=flat)](https://www.npmjs.org/package/react-tunnels)[![Build Status](http://img.shields.io/travis/javivelasco/react-tunnels/master.svg?style=flat-square)](https://travis-ci.org/javivelasco/react-tunnels)

Render React components in placeholders that are placed somewhere else in the component tree.

## Install

```
yarn add react-tunnels
```

### Why

There is a common use case in React apps where you want to define a `Layout` where the content of some elements is defined by `children` components. For example, you want to define `Layout` just once and reuse it for every page but it has a breadcrumb whose steps depend on `children` components. This tiny library allows you to define *tunnels* to render from an element to whatever another element in the App, even elements located on top of the tree. It's like `Portal` but the target is a *component* instead of a *DOM element*.

## Usage

Define a `TunnelPlaceholder` identified by an `id` and decide what properties are going to be passed to its `render` function by defining `Tunnel` components with the **same id** anywhere else in the app. If you define just a single `Tunnel` its props will be passed straight to the `render` function, if there is more than one `Tunnel` for a single `id`, the placeholder `render` function will receive an `item` argument which is an Array containing the `props` for each `Tunnel`. Let's see some examples.

### Simple example: children tunneling

Define a placeholder without any render function so it will render any children coming from a `Tunnel` component with the same id.

```jsx
import { TunnelProvider, TunnelPlaceholder, Tunnel } from 'react-tunnels'

render(
  <TunnelProvider>
    <div>
      <TunnelPlaceholder id="my-tunnel" />
      <Tunnel id="my-tunnel">
        This will be rendered on the placeholder 👆
      </Tunnel>
    </div>
  </TunnelProvider>
)
```

Check the real example [here](https://codesandbox.io/s/p79k8w0jnq)

### More complex example: building a Breadcrumb

It's easy to build a breadcrumb using the prop `multiple` in the `TunnelPlaceholder`. This allows to let it know that there will be multiple tunnels so the `render` function will be called with an array of props.

```jsx
const Breadcrumbs = () => (
  <TunnelPlaceholder id="breadcrumb" multiple>
    {({ items }) => (
      items.map(({ children, href }) => (
        <span><a href={href}>{children}</a></span>
      ))
    )}
  </TunnelPlaceholder>
)

const Breadcrumb = ({ children, url }) => (
  <Tunnel id="breadcrumb" url={url}>
    {children}
  </Tunnel>
)

render(
  <TunnelProvider>
    {/* This will render the breadcrumb */}
    <Breadcrumbs />
    {/* Somewhere else in children */}
    <Breadcrumb url="/products">Products</Breadcrumb>
    <Breadcrumb url="/products/123">Product <strong>123</strong></Breadcrumb>
  </TunnelProvider>
)
```

Check the live example [here](https://codesandbox.io/s/0ym0n37jnl)

## Similar Libraries

- [React Slot Fill](https://github.com/camwest/react-slot-fill): A similar project built by [Cameron Westland](https://github.com/camwest) with a slightly different API and a bit more limited use cases. The main difference is that you can't pass content to a placeholder from multiple entry points. react-tunnels does this by passing an array with the props defined by each tunnel to the render function of the placeholder. For simple cases though, it is pretty similar.
- [Preact Slots](https://github.com/developit/preact-slots): A library similar to React Slot Fill but for [Preact](https://github.com/developit/preact) developed by [Jason Miller](https://twitter.com/_developit).

## About

This project has been developed by [Javi Velasco](https://twitter.com/javivelasco) as a way to build *Breadcrumb* components and `Layout` customizations for a variety of React projects. Any feeback, help or improvements is highly appreciated.

## License

This project is licensed under the terms of the [MIT license](https://github.com/javivelasco/react-tunnels/blob/master/LICENSE).
