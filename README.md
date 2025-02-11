<p></p>

<a href="/../../#readme">
  <img src="/docs/logo.svg" align="left" height="154"  width="154" alt="vite-plugin-ssr"/>
</a>

# `vite-plugin-ssr`

Simple, full-fledged, do-one-thing-do-it-well.

<a href="https://discord.gg/qTq92FQzKb">
  <img src="/docs/discord.svg" height="32" width="117.078" alt="Discord vite-plugin-ssr"/>
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://twitter.com/brillout/status/1371806177424777216">
  <img src="/docs/twitter_retweet.svg" height="32" width="179" alt="Retweet vite-plugin-ssr"/>
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://twitter.com/brillout">
  <img src="/docs/twitter_follow.svg" height="32" width="133" alt="Follow @brillout"/>
</a>
&nbsp;&nbsp;&nbsp;
<a href="/CHANGELOG.md">
  <img src="/docs/changelog.svg" height="32" width="116" alt="Changelog"/>
</a>

<br/>

<br/> **Overview**
<br/> &nbsp;&nbsp; [Introduction](#introduction)
<br/> &nbsp;&nbsp; [Vue Tour](#vue-tour)
<br/> &nbsp;&nbsp; [React Tour](#react-tour)
<br/>
<br/> **Get Started**
<br/> &nbsp;&nbsp; [Boilerplates](#boilerplates)
<br/> &nbsp;&nbsp; [Manual Installation](#manual-installation)
<br/>
<br/> **Guides**
<br/><sub>&nbsp;&nbsp;&nbsp; Basics</sub>
<br/> &nbsp;&nbsp; [Data Fetching](#data-fetching)
<br/> &nbsp;&nbsp; [Routing](#routing)
<br/> &nbsp;&nbsp; [Pre-rendering](#pre-rendering) (SSG)
<br/><sub>&nbsp;&nbsp;&nbsp; More</sub>
<br/> &nbsp;&nbsp; [SPA vs SSR vs HTML](#spa-vs-ssr-vs-html)
<br/> &nbsp;&nbsp; [HTML `<head>`](#html-head)
<br/> &nbsp;&nbsp; [Page Redirection](#page-redirection)
<br/> &nbsp;&nbsp; [Base URL](#base-url)
<br/><sub>&nbsp;&nbsp;&nbsp; Integrations</sub>
<br/> &nbsp;&nbsp; [Authentication](#authentication) (Auth0, Passport.js, Grant, ...)
<br/> &nbsp;&nbsp; [Markdown](#markdown)
<br/> &nbsp;&nbsp; [Store](#store) (Vuex, Redux, ...)
<br/> &nbsp;&nbsp; [GraphQL & RPC](#graphql--rpc) (Apollo, Relay, Wildcard API, ...)
<br/> &nbsp;&nbsp; [Tailwind CSS](#tailwind-css)
<br/> &nbsp;&nbsp; [Other Tools](#other-tools) (CSS Frameworks, Google Analytics, jQuery, Service Workers, Sentry, ...)
<br/><sub>&nbsp;&nbsp;&nbsp; Deploy</sub>
<br/> &nbsp;&nbsp; [Static Hosts](#static-hosts) (Netlify, GitHub Pages, Cloudflare Pages, ...)
<br/> &nbsp;&nbsp; [Cloudflare Workers](#cloudflare-workers)
<br/> &nbsp;&nbsp; [AWS Lambda](#aws-lambda)
<br/> &nbsp;&nbsp; [Firebase](#firebase)
<br/>
<br/> **API**
<br/><sub>&nbsp;&nbsp;&nbsp; Node.js & Browser</sub>
<br/> &nbsp;&nbsp; [`*.page.js`](#pagejs)
<br/> &nbsp;&nbsp; [`pageContext`](#pagecontext)
<br/><sub>&nbsp;&nbsp;&nbsp; Node.js</sub>
<br/> &nbsp;&nbsp; [`*.page.server.js`](#pageserverjs)
<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8226;&nbsp; [`export { addPageContext }`](#export--addpagecontext-)
<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8226;&nbsp; [`export { passToClient }`](#export--passtoclient-)
<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8226;&nbsp; [`export { render }`](#export--render-)
<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8226;&nbsp; [`export { prerender }`](#export--prerender-)
<br/> &nbsp;&nbsp; [`import { html } from 'vite-plugin-ssr'`](#import--html--from-vite-plugin-ssr)
<br/><sub>&nbsp;&nbsp;&nbsp; Browser</sub>
<br/> &nbsp;&nbsp; [`*.page.client.js`](#pageclientjs)
<br/> &nbsp;&nbsp; [`import { getPage } from 'vite-plugin-ssr/client'`](#import--getpage--from-vite-plugin-ssrclient)
<br/> &nbsp;&nbsp; [`import { useClientRouter } from 'vite-plugin-ssr/client/router'`](#import--useClientRouter--from-vite-plugin-ssrclientrouter)
<br/> &nbsp;&nbsp; [`import { navigate } from 'vite-plugin-ssr/client/router'`](#import--navigate--from-vite-plugin-ssrclientrouter)
<br/><sub>&nbsp;&nbsp;&nbsp; Routing</sub>
<br/> &nbsp;&nbsp; [`*.page.route.js`](#pageroutejs)
<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8226;&nbsp; [Route String](#route-string)
<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8226;&nbsp; [Route Function](#route-function)
<br/> &nbsp;&nbsp; [Filesystem Routing](#filesystem-routing)
<br/><sub>&nbsp;&nbsp;&nbsp; Special Pages</sub>
<br/> &nbsp;&nbsp; [`_default.page.*`](#_defaultpage)
<br/> &nbsp;&nbsp; [`_error.page.*`](#_errorpage)
<br/><sub>&nbsp;&nbsp;&nbsp; Integration</sub>
<br/> &nbsp;&nbsp; [`import { createPageRender } from 'vite-plugin-ssr'`](#import--createpagerender--from-vite-plugin-ssr) (Server Integration Point)
<br/> &nbsp;&nbsp; [`import ssr from 'vite-plugin-ssr/plugin'`](#import-ssr-from-vite-plugin-ssrplugin) (Vite Plugin)
<br/><sub>&nbsp;&nbsp;&nbsp; CLI</sub>
<br/> &nbsp;&nbsp; [Command `prerender`](#command-prerender)

<br/>


## Overview

### Introduction

`vite-plugin-ssr` provides a similar experience than Nuxt/Next.js, but with Vite's wonderful DX, and as a do-one-thing-do-it-well tool.

- **Do-One-Thing-Do-It-Well**. Only takes care of SSR, and works with: other Vite plugins, any view framework (Vue, React, ...), and any server environment (Express, Fastify, Cloudflare Workers, Firebase, ...).
- **Render Control**. You control how your pages are rendered enabling you to easily and naturally integrate tools (Vuex, Redux, Apollo GraphQL, Service Workers, ...).
- **SPA & SSR & HTML**. Render some pages as SPA, some with SSR, and some to HTML-only (with zero/minimal browser-side JavaScript).
- **Pre-render / SSG / Static Websites**. Deploy your app to a static host (Netlify, GitHub Pages, Cloudflare Pages, ...) by pre-rendering your pages.
- **Routing**. You can choose between Server-side Routing (for a simple architecture) and Client-side Routing (for faster/animated page transitions). You can also use Vue Router and React Router.
- **HMR**. Browser as well as server code is automatically reloaded.
- **Fast Cold Start**. [Node.js] Your pages are lazy-loaded; adding pages doesn't increase the cold start of your serverless functions.
- **Code Splitting**. [Browser] Each page loads only the code it needs. Lighthouse score of 100%.
- **Simple Design**. Simple overall design resulting in a tool that is small, robust, and easy to use.
- **Scalable**. Your source code can scale to thousands of files with no hit on dev speed (thanks to Vite's lazy transpiling), and with `vite-plugin-ssr` you get an SSR architecture that scales from small hobby projects with simple needs to large-scale enterprise projects with highly custom SSR needs.
- **No Known Bug**. The source code of `vite-plugin-ssr` has no known bug; any bug you may encounter will be quickly fixed.
- **Responsive**. Made with :heart:; GitHub issues are welcome and answered; conversations are welcome at [Discord - `vite-plugin-ssr`](https://discord.gg/qTq92FQzKb).

To get an idea of what it's like to use `vite-plugin-ssr`, check out the [Vue Tour](#vue-tour) or [React Tour](#react-tour).

<br/><br/>


### Vue Tour

Similarly to Nuxt,
you create pages by defining `.page.vue` files.

```vue
<!-- /pages/index.page.vue -->
<!-- Environment: Browser, Node.js -->

<template>
  This page is rendered to HTML and interactive:
  <button @click="state.count++">Counter {{ state.count }}</button>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({ count: 0 })
    return { state }
  }
}
</script>
```

By default, `vite-plugin-ssr` does Filesystem Routing.
```
FILESYSTEM                  URL
pages/index.page.vue        /
pages/about.page.vue        /about
```

If you need more control, you can create a `.page.route.js` file to define a *Route String* (for parameterized routes such as `/movies/:id`) or a *Route Function* (for full programmatic flexibility).

```js
// /pages/index.page.route.js
// Environment: Node.js (and Browser if you opt-in for Client-side Routing)

// We define a Route Function for `/pages/index.page.vue`:
export default ({ url }) => url === '/'

/* Or we define a Route String:
export default '/'
*/

// Or we don't create `.page.route.js` and Filesystem Routing is used
```

Unlike Nuxt,
*you* define how your pages are rendered.

```js
// /pages/_default.page.server.js
// Environment: Node.js

import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { html } from 'vite-plugin-ssr'

export { render }

async function render({ Page, pageContext }) {
  const app = createSSRApp({
    render: () => h(Page, pageContext.pageProps)
  })

  const appHtml = await renderToString(app)

  const title = 'Vite SSR'

  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${html.dangerouslySetHtml(appHtml)}</div>
      </body>
    </html>`
}
```
```js
// /pages/_default.page.client.js
// Environment: Browser

import { createSSRApp, h } from 'vue'
import { getPage } from 'vite-plugin-ssr/client'

hydrate()

async function hydrate() {
  // `Page` and `pageContext` are preloaded in production
  const { Page, pageContext } = await getPage()

  const app = createSSRApp({
    render: () => h(Page, pageContext.pageProps)
  })

  app.mount('#app')
}
```

The `render()` hook in `/pages/_default.page.server.js` gives you full control over how your pages are rendered,
and `/pages/_default.page.client.js` gives you full control over the browser-side code.
This control enables you to *easily* and *naturally*:
 - Use any tool you want such as Vue Router and Vuex.
 - Use Vue 2, Vue 3, any any future Vue version (you can actually use any view framework you want, e.g. React).

Note the suffixes of the files we created:
 - `.page.js`: exports the page's root Vue component.
 - `.page.client.js` (optional): defines the page's browser-side code.
 - `.page.server.js` (optional): exports the page's hooks (always run in Node.js).
 - `.page.route.js` (optional): exports the page's Route String or Route Function.

Instead of creating a `.page.client.js` and `.page.server.js` file for each page, you can create `_default.page.client.js` and `_default.page.server.js` which apply as default for all pages.

We already defined `_default` files above,
which means that all we have to do now to create a new page is to define a new `.page.vue` file.

The `_default` files can be overridden. For example, you can create a page with a different browser-side code than your other pages.

```js
// /pages/about.page.client.js

// This file is empty which means that the `/about` page has zero browser-side JavaScript.
```
```vue
<!-- /pages/about.page.vue -->

<template>
  This page is only rendered to HTML.
</template>
```

By overriding `_default.page.server.js#render` you can
even render some of your pages with a different view framework, e.g. another Vue version (for progressive upgrade) or even React.

Note how files are collocated and share the same base `/pages/about.page.`;
this is how you tell `vite-plugin-ssr` that `/pages/about.page.client.js` is the browser-side code of `/pages/about.page.vue`.

Let's now have a look at how to fetch data for a page that has a parameterized route.

```vue
<!-- /pages/star-wars/movie.page.vue -->
<!-- Environment: Browser, Node.js -->

<template>
  <h1>{{movie.title}}</h1>
  <p>Release Date: {{movie.release_date}}</p>
  <p>Director: {{movie.director}}</p>
</template>

<script lang="js">
const pageProps = ['movie']
export default { props: pageProps }
</script>
```
```js
// /pages/star-wars/movie.page.route.js
// Environment: Node.js

export default '/star-wars/:movieId'
```
```js
// /pages/star-wars/movie.page.server.js
// Environment: Node.js

import fetch from 'node-fetch'

export async function addPageContext({ pageContext }) {
  // The route parameter of `/star-wars/:movieId` is available at `pageContext.routeParams.movieId`
  const { movieId } = pageContext.routeParams

  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
  const response = await fetch(`https://swapi.dev/api/films/${movieId}`)
  let movie = await response.json()

  // The render/hydrate functions we defined earlier use `pageContext.pageProps`.
  // This is where we define `pageContext.pageProps`.
  const pageProps = { movie }

  // `pageProps` is now available at `pageContext.pageProps`
  return { pageProps }
}

// By default `pageContext` is available only on the server. But our hydrate function
// we defined earlier runs in the browser and needs `pageContext.pageProps`; we use
// `passToClient` to tell `vite-plugin-ssr` to serialize and make `pageContext.pageProps`
// available in the browser.
export const passToClient = ['pageProps']
```

Note that `vite-plugin-ssr` doesn't know anything about `pageProps`: it's an object we create to
conveniently hold all props of the root Vue component.
(We could have defined `movie` directly on `pageContext.movie` but it's cumbersome:
our render/hydrate function would then need to know what `pageContext` should be passed to the root Vue component, whereas with `pageContext.pageProps` our render/hydrate function can simply pass `pageContext.pageProps` to the root Vue component.)

That's it, we have seen most of `vite-plugin-ssr`'s interface;
not only is `vite-plugin-ssr` flexible but also simple, easy, and fun to use.

<br/><br/>


### React Tour

Similarly to Next.js,
you create pages by defining `.page.jsx` files.

```jsx
// /pages/index.page.jsx
// Environment: Browser, Node.js

import React, { useState } from "react";

export { Page };

function Page() {
  return <>
    This page is rendered to HTML and interactive: <Counter />
  </>;
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((count) => count + 1)}>
      Counter {count}
    </button>
  );
}
```

By default, `vite-plugin-ssr` does Filesystem Routing.
```
FILESYSTEM                  URL
pages/index.page.jsx        /
pages/about.page.jsx        /about
```

If you need more control, you can create a `.page.route.js` file to define a *Route String* (for parameterized routes such as `/movies/:id`) or a *Route Function* (for full programmatic flexibility).

```js
// /pages/index.page.route.js
// Environment: Node.js (and Browser if you opt-in for Client-side Routing)

// We define a Route Function for `/pages/index.page.jsx`:
export default ({ url }) => url === "/";

/* Or we define a Route String:
export default "/";
*/

// Or we don't create `.page.route.js` and Filesystem Routing is used
```

Unlike Next.js,
*you* define how your pages are rendered.

```jsx
// /pages/_default.page.server.jsx
// Environment: Node.js

import ReactDOMServer from "react-dom/server";
import React from "react";
import { html } from "vite-plugin-ssr";

export { render };

async function render({ Page, pageContext }) {
  const viewHtml = ReactDOMServer.renderToString(
    <Page {...pageContext.pageProps} />
  );

  const title = "Vite SSR";

  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${html.dangerouslySetHtml(viewHtml)}</div>
      </body>
    </html>`;
}
```
```jsx
// /pages/_default.page.client.jsx
// Environment: Browser

import ReactDOM from "react-dom";
import React from "react";
import { getPage } from "vite-plugin-ssr/client";

hydrate();

async function hydrate() {
  // `Page` and `pageContext` are preloaded in production
  const { Page, pageContext } = await getPage();

  ReactDOM.hydrate(
    <Page {...pageContext.pageProps} />,
    document.getElementById("page-view")
  );
}
```

The `render()` hook in `/pages/_default.page.server.jsx` gives you full control over how your pages are rendered,
and `/pages/_default.page.client.jsx` gives you full control over the browser-side code.
This control enables you to *easily* and *naturally*:
 - Use any tool you want such as React Router and Redux.
 - Use Preact, Inferno, Solid and any other React-like alternative.

Note the suffixes of the files we created:
 - `.page.js`: exports the page's root React component.
 - `.page.client.js` (optional): defines the page's browser-side code.
 - `.page.server.js` (optional): exports the page's hooks (always run in Node.js).
 - `.page.route.js` (optional): exports the page's Route String or Route Function.

Instead of creating a `.page.client.js` and `.page.server.js` file for each page, you can create `_default.page.client.js` and `_default.page.server.js` which apply as default for all pages.

We already defined `_default` files above,
which means that all we have to do now to create a new page is to define a new `.page.jsx` file.

The `_default` files can be overridden. For example, you can create a page with a different browser-side code than your other pages.

```js
// /pages/about.page.client.js

// This file is empty which means that the `/about` page has zero browser-side JavaScript.
```
```jsx
// /pages/about.page.jsx

export { Page };

function Page() {
  return <>This page is only rendered to HTML.<>;
}
```

By overriding `_default.page.server.js#render` you can
even render some of your pages with a different view framework, e.g. another React version (for progressive upgrade) or even Vue.

Note how files are collocated and share the same base `/pages/about.page.`;
this is how you tell `vite-plugin-ssr` that `/pages/about.page.client.js` is the browser-side code of `/pages/about.page.jsx`.

Let's now have a look at how to fetch data for a page that has a parameterized route.

```jsx
// /pages/star-wars/movie.page.jsx
// Environment: Browser, Node.js

import React from "react";

export { Page };

function Page(pageProps) {
  const { movie } = pageProps;
  return <>
    <h1>{movie.title}</h1>
    <p>Release Date: {movie.release_date}</p>
    <p>Director: {movie.director}</p>
  </>;
}
```
```js
// /pages/star-wars/movie.page.route.js
// Environment: Node.js

export default "/star-wars/:movieId";
```
```js
// /pages/star-wars/movie.page.server.js
// Environment: Node.js

import fetch from "node-fetch";

export async function addPageContext({ pageContext }) {
  // The route parameter of `/star-wars/:movieId` is available at `pageContext.routeParams.movieId`
  const { movieId } = pageContext.routeParams

  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
  const response = await fetch(`https://swapi.dev/api/films/${movieId}`)
  let movie = await response.json();

  // The render/hydrate functions we defined earlier use `pageContext.pageProps`.
  // This is where we define `pageContext.pageProps`.
  const pageProps = { movie };

  // `pageProps` is now available at `pageContext.pageProps`
  return { pageProps };
}

// By default `pageContext` is available only on the server. But our hydrate function
// we defined earlier runs in the browser and needs `pageContext.pageProps`; we use
// `passToClient` to tell `vite-plugin-ssr` to serialize and make `pageContext.pageProps`
// available in the browser.
export const passToClient = ["pageProps"];
```

Note that `vite-plugin-ssr` doesn't know anything about `pageProps`: it's an object we create to
conveniently hold all props of the root React component.
(We could have defined `movie` directly on `pageContext.movie` but it's cumbersome:
our render/hydrate function would then need to know what `pageContext` should be passed to the root React component, whereas with `pageContext.pageProps` our render/hydrate function can simply pass `pageContext.pageProps` to the root React component.)

That's it, we have seen most of `vite-plugin-ssr`'s interface;
not only is `vite-plugin-ssr` flexible but also simple, easy, and fun to use.

</details>

<br/><br/>


## Get Started

### Boilerplates

Scaffold an app with Vite and `vite-plugin-ssr`.

With npm:

```
npm init vite-plugin-ssr
```

With Yarn:

```
yarn create vite-plugin-ssr
```

A prompt will let you choose between:
 - `vue`: Vue + JavaScript
 - `vue-ts`: Vue + TypeScript
 - `react`: React + JavaScript
 - `react-ts`: React + TypeScript

Options:
 - `--skip-git`: don't initialize a new Git repository

<br/><br/>


### Manual Installation

If you already have an existing Vite app and don't want to start from scratch:

1. Add `vite-plugin-ssr` to your `vite.config.js`.
   - [Example](boilerplates/boilerplate-vue/vite.config.js)

2. Integrate `createPageRender()` to your server (Express.js, Koa, Hapi, Fastify, ...).
   - [Example](boilerplates/boilerplate-vue/server/index.js)

3. Define `_default.page.client.js` and `_default.page.server.js`.
   - [Vue](boilerplates/boilerplate-vue/pages/_default/)
   - [Vue + TypeScript](boilerplates/boilerplate-vue-ts/pages/_default/)
   - [React](boilerplates/boilerplate-react/pages/_default/)
   - [React + TypeScript](boilerplates/boilerplate-react-ts/pages/_default/)

4. Create your first `.page.js` file.
   - [Vue](boilerplates/boilerplate-vue/pages/index.page.vue)
   - [Vue + TypeScript](boilerplates/boilerplate-vue-ts/pages/index.page.vue)
   - [React](boilerplates/boilerplate-react/pages/index.page.jsx)
   - [React + TypeScript](boilerplates/boilerplate-react-ts/pages/index.page.tsx)

5. Add the `dev` and `build` scripts to your `package.json`.
   - [Example](boilerplates/boilerplate-vue/package.json)

<br/><br/>


## Guides

### Data Fetching

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

You fech data by defining `export { addPageContext, passToClient }` in the Page's `.page.server.js` file.

 - [Example](#example)
 - [Pass `pageContext` to any/all components](#pass-pagecontext-to-anyall-components)
 - [Data Fetching with Stateful Component](#data-fetching-with-stateful-component)
 - [GraphQL](#graphql)
 - [Store (Vuex/Redux...)](#store-vuexredux)

<br/>

#### Example

```js
// /pages/movies.page.server.js
// Environment: Node.js

import fetch from "node-fetch";

export { addPageContext }
// Tell `vite-plugin-ssr` to make `pageContext.pageProps` available in the browser.
// Make sure that `pageContext.pageProps` is serializable: `vite-plugin-ssr` will
// serialize and pass `pageContext.pageProps` to the browser.
export const passToClient = ['pageProps']

async function addPageContext({ pageContext }) {
  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
  const response = await fetch("https://movies.example.org/api")
  let movies = await response.json()

  // `movies` will be serialized and passed to the browser; we select only the data we
  // need in order to minimize what is sent over the network.
  movies = movies.map(({ title, release_date }) => ({title, release_date}))

  // We could also `return { movies }` but we use an object `pageProps` as convenience.
  const pageProps = { movies }
  return { pageProps }
}
```
```js
// /pages/_default.page.server.js
// Environment: Node.js

import { html } from 'vite-plugin-ssr'
import { renderToHtml, createElement } from 'some-view-framework'

export { render }

async function render({ Page, pageContext }) {
  const pageHtml = await renderToHtml(
    // Our convenience object `pageProps` allows us to pass all root component props at once.
    createElement(Page, pageContext.pageProps)
  )
  /* JSX:
  const pageHtml = await renderToHtml(<Page {...pageContext.pageProps} />)
  */

  return html`<html>
    <div id='view-root'>
      ${html.dangerouslySetHtml(pageHtml)}
    </div>
  </html>`
}
```
```js
// /pages/_default.page.client.js
// Environment: Browser

import { getPage } from 'vite-plugin-ssr/client'
import { hydrateToDom, createElement } from 'some-view-framework'

hydrate()

async function hydrate() {
  const { Page, pageContext } = await getPage()
  await hydrateToDom(
    // Thanks to `passToClient = ['pageProps']` our `pageContext.pageProps` is
    // available here in the browser.
    createElement(Page, pageContext.pageProps),
    document.getElementById('view-root')
  )
  /* JSX:
  await hydrateToDom(<Page {...pageContext.pageProps} />, document.getElementById('view-root'))
  */
}
```
```js
// /pages/movies.page.js
// Environment: Browser, Node.js

export { Page }

// In our `render()` and `hydrate()` functions above, we pass `pageContext.pageProps` to `Page`
function Page(pageProps) {
  const { movies } = pageProps

  // ...
}
```

Note that `vite-plugin-ssr` doesn't know anything about `pageProps`: it's an object we create to
conveniently hold all props of the root component.
We could have defined `movies` directly on `pageContext.movies` but it's cumbersome:
our render/hydrate function would then need to know what `pageContext` should be passed to the root component, whereas with `pageContext.pageProps` our render/hydrate function can simply pass `pageContext.pageProps` to the root component.

<br/>

#### Pass `pageContext` to any/all components

You can pass some `pageContext` to any/all components of your component tree:
 - React: [React.createContext](https://reactjs.org/docs/context.html)
 - Vue 2: [Vue.prototype](https://vuejs.org/v2/cookbook/adding-instance-properties.html#Base-Example)
 - Vue 3: [app.provide](https://v3.vuejs.org/api/application-api.html#provide) or [app.config.globalProperties](https://v3.vuejs.org/guide/migration/global-api.html#vue-prototype-replaced-by-config-globalproperties)

<br/>

#### Data Fetching with Stateful Component

We can also fetch data by using a stateful component by making [`pageContext.routeParams`](#pagecontext) available everywhere with `export const passToClient = ['routeParams']` and then [pass it to the stateful component](#pass-pagecontext-to-anyall-components). Note that with this technique, the fetched data is *not* rendered to HTML.

<br/>

#### GraphQL

When using GraphQL with [Apollo GraphQL](https://www.apollographql.com/) or [Relay](https://relay.dev/) you can define GraphQL queries/fragments on a component-level, but you still always fetch data globally on a page-level. With `vite-plugin-ssr`, you do this global fetch in the `addPageContext()` hook.
 - [/examples/graphql-apollo/](examples/graphql-apollo/)

In general, with `vite-plugin-ssr`, you have full control over rendering which means that integrating GraphQL is mostly a matter of following the official SSR guide of the tool you are using (e.g. [Apollo GraphQL - SSR Guide](https://www.apollographql.com/docs/react/performance/server-side-rendering/)).

<br/>

#### Store (Vuex/Redux...)

When using a global store (e.g. with [Vuex](https://vuex.vuejs.org/) or [Redux](https://redux.js.org/)), your components use the store and don't use the fetched data directly; instead, you use the fetched data to set the initial state of the store. You then render the HTML with that initial store state and then pass the initial store state to the client for hydration, which, with `vite-plugin-ssr`, you can do with `export const passToClient = ['initialStoreState']`.
 - [/examples/redux/](examples/redux/)
 - [/examples/vuex/](examples/vuex/)

In general, with `vite-plugin-ssr`, you have full control over rendering which means that integrating a global store is mostly a matter of following the official SSR guide of the tool you are using (e.g. [Redux - SSR Guide](https://redux.js.org/recipes/server-rendering), [Vuex - SSR Guide](https://ssr.vuejs.org/guide/data.html#data-store)).

<br/><br/>


### Routing

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

 - [Filesystem Routing VS Route Strings VS Route Functions](#filesystem-routing-vs-route-strings-vs-route-functions)
 - [Server-side Routing VS Client-side Routing](#server-side-routing-vs-client-side-routing)
 - [Active Links `<a class="is-active">`](#active-links-a-classis-active)
 - [Nested Routes](#nested-routes)

<br/>

#### Filesystem Routing VS Route Strings VS Route Functions

If a page doesn't have a `.page.route.js` file then `vite-plugin-ssr` uses Filesystem Routing:

```
FILESYSTEM                  URL
pages/index.page.js         /
pages/about.page.js         /about
pages/faq/index.page.js     /faq
```

To define a parameterized route, or for more control, you can `export default` a Route String in `.page.route.js`.

```
// /pages/product.page.route.js

export default '/product/:productId'
```

The `productId` value is available at `pageContext.routeParams.productId` so that you can fetch data in `async addPageContext({ pageContext })` which is explained at [Data Fetching](#data-fetching).

For full programmatic flexibility, you can define a Route Function.

```js
// /pages/admin.page.route.js

// Route Functions allow us to implement advanced routing such as route guards.
export default ({ url, pageContext }) => {
  if (url === '/admin' && pageContext.user.isAdmin) {
    return { match: true }
  }
}
```

For detailed informations about Filesystem Routing, Route Strings, and Route Functions:
 - [API - Filesystem Routing](#filesystem-routing)
 - [API - `*.page.route.js`](#pageroutejs)
 - [API - Route String](#route-string)
 - [API - Route Function](#route-function)

<br/>

#### Server-side Routing VS Client-side Routing

You can choose between two routing strategy:
 - Server-side Routing (for simpler architecture)
 - Client-side Routing (for faster and animated page transitions)

You can also use a routing library such as Vue Router and React Router (in complete replacement or in combination). Examples:
 - [/examples/vue-router/](examples/vue-router/)
 - [/examples/react-router/](examples/react-router/)

By default, `vite-plugin-ssr` does Server-side Routing,
which is the "old school" way of doing routing: when the user changes the page,
a new HTML request is made, and the old page (i.e. its HTML) is completely replaced with the new page.

If you don't have a strong rationale for doing something differently, then stick to Server-side Routing as it leads to a simpler app architecture.

That said, `vite-plugin-ssr` has first-class support for Client-side Routing and you can opt-in by using `useClientRouter()`:
 - [`import { useClientRouter } from 'vite-plugin-ssr/client/router'`](#import--useClientRouter--from-vite-plugin-ssrclientrouter)

With Client-side Routing,
instead of doing a full HTML reload,
only the DOM is updated:
the new page's root (Vue/React/...) component is loaded and the view framework (Vue/React/...)
renders the new root component to the DOM.

Client-side Routing enables:
- Slightly faster page transitions.
- Custom animated page transitions.

But Client-side Routing leads to an inherently more complex app architecture,
which is why we recommend using Client-side Routing only if you
have a strong rationale.

<br/>

#### Active Links `<a class="is-active">`

Pass `pageContext.urlPathname` (available on both the client and the server)
[to your link component](#pass-pagecontext-to-anyall-components).
You can then set `isActive = href===urlPathname` in your link component.

<br/>

#### Nested Routes

A nested route (aka sub route) is, essentially, when you have a route with multiple parameters,
for example `/product/:productId/:productView`.

```
URL                        productId     productView
/product/1337              1337          null
/product/1337/pricing      1337          pricing
/product/42/reviews        42            reviews
```

With `vite-plugin-ssr`, we can define a Route String that has multiple parameters.

```js
// product.page.route.js

export default `/product/:productId/:productView`
```

```js
// product.page.route.js

// We can also use a Route Function
export default ({ url }) => {
  if (! url.startsWith('/product/')) return false
  const [productId, productView] = url.split('/').slice(2)
  return { match: true, routeParams: { productId, productView } }
}
```

Usually, the sub route is used for navigating some (deeply) nested view:

```
/product/42/pricing                   /product/42/reviews
+------------------+                  +-----------------+
| Product          |                  | Product         |
| +--------------+ |                  | +-------------+ |
| | Pricing      | |  +------------>  | | Reviews     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

> :warning: If your sub routes don't need URLs (if it's fine that the Product Pricing and the Product Reviews share the same URL `/product/42`), then you can simply use a stateful component instead. (When the user clicks on a "pricing" link => the stateful component changes its internal state `productView` to `'pricing'` to show the pricing view.)

By default,
`vite-plugin-ssr` does [Server-side Routing](#server-side-routing-vs-client-side-routing),
which means that when the user navigates from `/product/42/pricing` to `/product/42/reviews`,
the old page (i.e. the HTML of) `/product/42/pricing` is fully replaced with the new page (i.e. the HTML of) `/product/42/reviews`,
leading to a jittery experience.

For smoother navigations, we can use [Client-side Routing](#import--useClientRouter--from-vite-plugin-ssrclientrouter).

```js
// product.page.client.js

import { useClientRouter } from 'vite-plugin-ssr/client/router'

// We use Client-side Routing so that, when the user navigates from `/product/42/pricing`
// to `/product/42/reviews`, only the relevant (deeply) nested view is updated (instead of
// a full HTML reload).

// Note that we override `_default.page.client.js`. This means all our other pages can use
// Server-side Routing while this page uses Client-side Routing.
// (If we are already using `useClientRouter()` in `_default.page.client.js`, then we don't need to
// create this `product.page.client.js` file.)

useClientRouter({
  render({ Page, pageContext }) {
    /* ... */
  }
})
```

We can then use `<a href="/product/42/reviews" keep-scroll-position />` / `navigate('/product/42/reviews', { keepScrollPosition: true })` to avoid the browser to scroll to the top upon navigation.

We can also [pass `pageContext.routeParams` to any/all components](#pass-pagecontext-to-anyall-components),
so that we can navigate/render the routed nested view.

Alternatively,
we can use a Route String Wildcard (e.g. `/product/:params*`) and then use a routing library (Vue Router, React Router, ...) for that page,
but we recommend the aforementioned solution instead as it is usually simpler.

<br/><br/>


### Pre-rendering

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

> :asterisk: **What is pre-rendering?**
> Pre-rendering means to render the HTML of all your pages at build-time:
> normally the HTML of a page is rendered at request-time
> (when your user navigates to that page), but
> with pre-rendering the HTML of a page is rendered at build-time instead.
> Your app then consists only of static files (HTML, JS, CSS, images, ...)
> that you can deploy to so-called "static hosts" such as [GitHub Pages](https://pages.github.com/), [Cloudflare Pages](https://pages.cloudflare.com/), or [Netlify](https://www.netlify.com/).
> If you don't use pre-rendering, then you need to use a Node.js server to be able to render your pages' HTML at request-time.

To pre-render your pages, use the [CLI command `prerender`](#command-prerender) at the end of your build:
 - With npm: run `$ npx vite build && npx vite build --ssr && npx vite-plugin-ssr prerender`.
 - With Yarn: `$ yarn vite build && yarn vite build --ssr && yarn vite-plugin-ssr prerender`.

For pages with a parameterized route (e.g. `/movie/:movieId`), you have to use the [`prerender()` hook](#export--prerender-).

The `prerender()` hook can also be used to accelerate the pre-rendering process as it allows you to prefetch data for multiple pages at once.

Examples:
 - [/examples/vue/](examples/vue/)
 - [/examples/react/](examples/react/)

<br/><br/>


### SPA vs SSR vs HTML

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

With `vite-plugin-ssr` you can create:
 - SSR pages
 - SPA pages (aka MPA)
 - HTML pages (with zero/minimal browser-side JavaScript)

For example, you can render your admin panel as SPA while rendering your marketing pages to HTML-only.

The rule of thumb is to render a page to:
 - HTML (zero/minimal browser-side JavaScript), if the page has no interactivity (technically speaking: if the page has no stateful component). Example: blog, non-interactive marketing pages.
 - SPA, if the page has interactivity and doesn't need SEO (e.g. the page doesn't need to appear on Google). Example: admin panel, desktop-like web app.
 - SSR, if the page has interactivity and needs SEO (the page needs to rank high on Google). Example: social news website, interactive marketing pages.

To render a page as SPA, simply render static HTML:

```js
// .page.server.js
// Environment: Node.js

import { html } from 'vite-plugin-ssr'

export function render () {
  // `div#app-root` is empty; the HTML is static.
  return html`<html>
    <head>
      <title>My Website</title>
    </head>
    <body>
      <div id="app-root"/>
    </body>
  </html>`
}
```

To render a page to HTML-only, define an empty `.page.client.js`:

```js
// .page.client.js
// Environment: Browser

// We leave this empty; there is no browser-side JavaScript.

// We can still include CSS
import './path/to/some.css'
```

<br/><br/>


### HTML `<head>`

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

HTML `<head>` tags such as `<title>` and `<meta>` are defined in the `render()` hook.

```js
// _default.page.server.js
// Environment: Node.js

import { html } from 'vite-plugin-ssr'
import { renderToHtml } from 'some-view-framework'

export { render }

async function render({ Page, pageContext }) {
  return html`<html>
    <head>
      <title>SpaceX</title>
      <meta name="description" content="We deliver your payload to space.">
    </head>
    <body>
      <div id="root">
        ${html.dangerouslySetHtml(await renderToHtml(Page))}
      </div>
    </body>
  </html>`
}
```

If you want to define `<title>` and `<meta>` tags on a page-by-page basis, you can use `pageContext`.

```js
// _default.page.server.js

import { html } from 'vite-plugin-ssr'
import { renderToHtml } from 'some-view-framework'

export { render }

async function render({ Page, pageContext }) {
  // We use `pageContext.documentProps` which pages define in their `addPageContext()` hook
  let title = pageContext.documentProps.title
  let description = pageContext.documentProps.description

  // Defaults
  title = title || 'SpaceX'
  description = description || 'We deliver your payload to space.'

  return html`<html>
    <head>
      <title>${title}</title>
      <meta name="description" content="${description}">
    </head>
    <body>
      <div id="root">
        ${html.dangerouslySetHtml(await renderToHtml(Page))}
      </div>
    </body>
  </html>`
}
```
```js
// about.page.server.js

export { addPageContext }

function addPageContext() {
  const documentProps = {
    // This title and description will override the defaults
    title: 'About SpaceX',
    description: 'Our mission is to explore the galaxy.'
  }
  return { documentProps }
}
```

If you want to define `<head>` tags by some deeply nested view component:
 1. Add `documentProps` to `passToClient`.
 2. Pass `pageContext.documentProps` [to all your components](#pass-pagecontext-to-anyall-components).
 3. Modify `pageContext.documentProps` in your deeply nested component.

```js
// _default.page.server.js
// Environment: Node.js

import { html } from 'vite-plugin-ssr'

// We make `pageContext.documentProps` available in the browser.
export const passToClient = ['pageProps', 'documentProps']

export async function render({ Page, pageContext }) {
  // Use your view framework to pass `pageContext.documentProps` to all components.
  // of your component tree. (E.g. React Context or Vue's `app.config.globalProperties`.)

  // What happens here is:
  // 1. Your view framework passes `documentProps` to all your components
  // 2. You modify `documentProps` in one of your components
  // 3. You render the HTML meta tags with `documentProps`
  return html`<html>
    <head>
      <title>${pageContext.documentProps.title}</title>
      <meta name="description" content="${pageContext.documentProps.description}">
    </head>
    <body>
      <div id="app">
        ${html.dangerouslySetHtml(appHtml)}
      </div>
    </body>
  </html>`
}
```
```js
// _default.page.client.js
// Environment: Browser

hydrate()

function hydrate() {
  // Thanks to the fact that `passToClient.includes('documentProps')`,
  // `pageContext.documentProps` is available here in the browser.
  // Use your view framework to pass `pageContext.documentProps` to all components.
  // of your component tree. (E.g. React Context or Vue's `app.config.globalProperties`.)
}
```

```js
// Somewhere in a component deep inside your component tree

// Thanks to our previous steps, `documentProps` is available here.
documentProps.title = 'I was set by some deep component.'
documentProps.description = 'Me too.'
```

You can also use libraries such as [@vueuse/head](https://github.com/vueuse/head) or [react-helmet](https://github.com/nfl/react-helmet)
but use such library only if you have a *strong* rationale:
the solution using `pageContext.documentProps` is considerably simpler and works for the vast majority of cases.

<br/><br/>


### Page Redirection

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

Your `render()` hook doesn't have to return HTML and can, for example,
return an object such as `{ redirectTo: '/some/url' }`
which is then available at your server integration point `createPageRender()`
(you can then perform a URL redirect there).

```js
// movie.page.route.js
export default "/star-wars/:movieId";
```
```js
// movie.page.server.js
// Environment: Node.js

export { addPageContext }

function addPageContext({ pageContext }) {
  // If the user goes to `/movie/42` but there is no movie with ID `42` then
  // we redirect the user to `/movie/add` so he can add a new movie.
  if (pageContext.routeParams.movieId === null) {
    return { redirectTo: '/movie/add' }
  }
}
```
```js
// _default.page.server.js
// Environment: Node.js

export { render }

function render({ pageContext }) {
  const { redirectTo } = pageContext
  if (redirectTo) return { redirectTo }

  // The usual stuff
  // ...
}
```
```js
// server.js
// Environment: Node.js

const renderPage = createPageRender(/*...*/)

app.get('*', async (req, res, next) => {
  const url = req.originalUrl
  const pageContext = {}
  const result = await renderPage({ url, pageContext })
  if (result.nothingRendered) {
    return next()
  } else if (result.renderResult?.redirectTo) {
    res.redirect(307, '/movie/add')
  } else {
    res.status(result.statusCode).send(result.renderResult)
  }
})
```

If you use Client-side Routing, then also redirect at `*.page.client.js`.

```js
// movie.page.server.js
// Environment: Node.js

// We make `pageContext.redirectTo` available to the browser for Client-side Routing redirection
export const passToClient = ['redirectTo']
```
```js
// _default.page.client.js
// Environment: Browser

import { useClientRouter, navigate } from 'vite-plugin-ssr/client/router'

useClientRouter({
  render({ Page, pageContext }) {
    const { redirectTo } = pageContext
    if (redirectTo) {
      navigate(redirectTo)
      return
    }

    // The usual stuff
    // ...
  }
})
```

<br/><br/>


### Base URL

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

The Base URL (aka Public Base Path) is about changing the URL root of your Vite app.
For example, instead of deploying your Vite app at `https://example.org` (i.e. `base: '/'`), you can set `base: '/some/nested/path/'` and deploy your Vite app at `https://example.org/some/nested/path/`.

Change Base URL for production:
1. Use Vite's [`--base` CLI build option](https://vitejs.dev/guide/build.html#public-base-path): `$ vite build --base=/some/nested/path/ && vite build --ssr --base=/some/nested/path/`. (For both `$ vite build` *and* `$ vite build --ssr`.)
2. If you don't pre-render your app: pass `base` to `createPageRender({ base: isProduction ? '/some/nested/path/' : '/' })`. (Pre-rendering automatically sets the right Base URL.)
3. Use the `import.meta.env.BASE_URL` value [injected by Vite](https://vitejs.dev/guide/build.html#public-base-path) to construct a `<Link href="/star-wars">` component that prepends the Base URL.

Change Base URL for local dev:
1. Pass `base` to `createServer({ base: '/some/nested/path/' })` (`import { createServer } from 'vite'`) and `createPageRender({ base: '/some/nested/path/' })` (`import { createPageRender } from 'vite-plugin-ssr'`).

You can also set `base: 'https://another-origin.example.org/'` (for cross-origin deployments) and `base: './'` (for embedded deployments at multiple paths).

Example:
 - [/examples/base-url/pages/_components/Link.jsx](examples/base-url/pages/_components/Link.jsx) (a `<Link>` component built on top of `import.meta.env.BASE_URL`)
 - [/examples/base-url/server/index.js](examples/base-url/server/index.js) (see the `base` option passed to `vite` and `vite-plugin-ssr`)
 - [/examples/base-url/package.json](examples/base-url/package.json) (see the build scripts)

<br/><br/>


### Authentication

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

You can add information about the authenticated user to `pageContext` at the server integration point
[`createPageRender()`](#import--createpagerender--from-vite-plugin-ssr).

```js
const renderPage = createPageRender(/*...*/)

app.get('*', async (req, res, next) => {
  const url = req.originalUrl

  // Authentication middlewares (e.g. Passport.js or Grant) provide informations
  // about the logged-in user on the `req` object, e.g. `req.user`:
  const user = req.user

  /* Or when using a third-party authentication provider (e.g. Auth0):
  const user = await authProviderApi.getUser(req.headers)
  */

  // We add the user auth information to `pageContext`
  const pageContext = { user }
  const result = await renderPage({ url, pageContext })

  if (result.nothingRendered) return next()
  res.status(result.statusCode).send(result.renderResult)
})
```

Some common auth tools:
- [Grant](https://github.com/simov/grant)
- [Passport.js](https://github.com/jaredhanson/passport)
- [Auth0](https://auth0.com/)

<br/><br/>


### Markdown

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

You can use `vite-plugin-ssr` with any Vite markdown plugin.

For Vue you can use [`vite-plugin-md`](https://github.com/antfu/vite-plugin-md).
Example:
 - [/examples/vue/vite.config.ts](examples/vue/vite.config.ts)
 - [/examples/vue/pages/markdown.page.md](examples/vue/pages/markdown.page.md)

For React you can use [`vite-plugin-mdx`](https://github.com/brillout/vite-plugin-mdx).
Example:
 - [/examples/react/vite.config.ts](examples/react/vite.config.ts)
 - [/examples/react/pages/markdown.page.md](examples/react/pages/markdown.page.md)

<br/><br/>


### Store

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

With `vite-plugin-ssr`, you have full control over rendering, which means that integrating tools is simply a matter of following the official SSR guide of the tool you are using.

- [Vuex SSR](https://ssr.vuejs.org/guide/data.html#data-store)
- [PullState SSR](https://lostpebble.github.io/pullstate/docs/quick-example-server-rendered)
- [Redux SSR](https://redux.js.org/recipes/server-rendering)

While you can follow the official guides *exactly* as-is and serialize the initial state into HTML,
you can also leverage `addPageContext()` with `passToClient` to make your life slightly easier
as shown in the following examples.

 - [/examples/vuex/](examples/vuex/)
 - [/examples/redux/](examples/redux/)

<br/><br/>


### GraphQL & RPC

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

With `vite-plugin-ssr`, you have full control over rendering, which means that integrating tools is simply a matter of following the official SSR guide of the tool you are using.

RPC:
 - [Wildcard API - SSR](https://github.com/brillout/wildcard-api#ssr)

GraphQL:
 - [Apollo GraphQL - Server-side rendering](https://www.apollographql.com/docs/react/performance/server-side-rendering/)
 - [Relay - SSR docs #3468](https://github.com/facebook/relay/issues/3468#issuecomment-824872147)

While you can follow the official guides *exactly* as-is and serialize the initial fetched data into HTML,
you can also leverage `addPageContext()` with `passToClient` to make your life slightly easier
as shown in the following example.

 - [/examples/graphql-apollo/](examples/graphql-apollo/)

<br/><br/>


### Tailwind CSS

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

1. ```bash
   npm install vite-plugin-windicss windicss
   # or
   yarn add vite-plugin-windicss windicss
   ```

2. Add `vite-plugin-windicss` to your `vite.config.js`.
   ```js
   import ssr from "vite-plugin-ssr/plugin"
   import WindiCSS from "vite-plugin-windicss"

   export default {
     plugins: [
       ssr(),
       WindiCSS({
         scan: {
           // By default only `src/` is scanned
           dirs: ["pages"],
           // You only have to specify the file extensions you actually use.
           fileExtensions: ["vue", "js", "ts", "jsx", "tsx", "html", "pug"]
         }
       })
     ]
   }
   ```
   > Alternatively, you can define these options in `windi.config.js`.

3. Add WindiCSS to your `_default.page.client.js`.
   ```js
   import 'virtual:windi.css'
   ```

That's it.

> More at [WindiCSS Vite Guide](https://windicss.org/integrations/vite.html).

<br/><br/>


### Other Tools

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

In general,
thanks to the fact that with `vite-plugin-ssr` you have full control over how your pages are rendered,
you can use `vite-plugin-ssr` with whatever tool you want.

In fact, `vite-plugin-ssr` is being used with a high variety of tools at companies with all kinds of diverse environments.
So far, no tool couldn't be used.

```js
// _default.page.server.js
// Environment: Node.js

import renderToHtml from 'some-view-framework'
import { html } from 'vite-plugin-ssr'

export { render }

async function render({ Page, pageContext }) {
  // We have full control over how pages are rendered.
  // E.g. we can use any view framework version we want (Vue 2, Vue 3, React 16, React 17, ...).
  const pageHtml = await renderToHtml(Page)

  // We have full control over the HTML
  return html`<html>
    <body>
      <div id="root">
        ${html.dangerouslySetHtml(pageHtml)}
      </div>
    </body>
  </html>`
}
```

```js
// server.js
// Environment: Node.js

// The server entry point

// We use Express.js here but we could as well use Fastify, Koa, Hapi, ...
const express = require('express')

const { createPageRender } = require('vite-plugin-ssr')

startServer()

async function startServer() {
  const app = express()

  // Server integration is just a function `renderPage()`.
  const renderPage = createPageRender(/*...*/)

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    // `renderPage()` is simply a function that, for a given URL, returns the result of our
    // `render()` hook (usually an HTML string). It doesn't know anything about Express.js and
    // we can use it with whatever server environment we want (Fastify, Cloudflare Workers, ...).
    const result = await renderPage({ url })
    res.send(result.renderResult)
  })
}
```

```js
// _default.page.client.js
// Environment: Browser

// This is the *entire* browser-side code; we have full control over the browser-side.
// If we save an empty `.page.client.js` then we have zero browser-side JavaScript.

import { getPage } from 'vite-plugin-ssr/client'
import { hydrateToDom } from 'some-view-framework'

// We can initialize browser libraries here.
$('.my-modals').modal()

// We can also initialize Service Workers here.

hydrate()

async function hydrate() {
  // `Page` is what we export in `*.page.js`; we have full control over what
  // we define in `*.page.js` and we can do whatever we want with it.
  const { Page } = await getPage()
  // We have full control over how pages are hydrated.
  await hydrateToDom(Page)
}
```

You have full control and you can do whatever you want.

<br/><br/>


### Static Hosts

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

You can [pre-render](#pre-rendering) your pages to remove the need for a Node.js server. Examples:
- [/examples/react/package.json](examples/react/package.json)
- [/examples/vue/package.json](examples/vue/package.json)

You can then deploy `dist/client/` to any static host, for example:

- [Cloudflare Pages](https://pages.cloudflare.com/) (if you want Cloudflare Pages to build your app for you, note that `vite-plugin-ssr` requires Node.js `>=12.19.0` and you may need to <a href="https://developers.cloudflare.com/pages/platform/build-configuration#language-support-and-tools">change the default Node.js version</a>)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

There are three strategies to build:
 - Build locally and upload `dist/client/` to the static host.
 - Build with a [GitHub action](https://github.com/features/actions) and upload `dist/client/` to the static host.
 - Let the static host run the build for you.

You can change your app's [Base URL](#base-url) in case you don't deploy your app at the URL root `/`. Example:
- [/examples/base-url/package.json](examples/base-url/package.json)

<br/><br/>


### Cloudflare Workers

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

Make sure to import `/dist/server/importer.js` in your worker code. (The `importer.js` makes all dependencies statically analysable so that the entire server code can be bundled into a single worker file.)

Example:
 - [/examples/cloudflare-workers](examples/cloudflare-workers)

<br/><br/>


### AWS Lambda

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

From an architectural point of view, your `vite-plugin-ssr` app is simply a Node.js application.

This means you can use any [AWS Lambda](https://aws.amazon.com/lambda/) Node.js deploy tool, for example:
- [Claudia.js](https://claudiajs.com/)
- [Apex Up](https://github.com/apex/up)
- [Serverless Framework](https://www.serverless.com/)
- [SAM](https://aws.amazon.com/serverless/sam/)

(In production, `vite-plugin-ssr` is simply two Express.js(/Fastify/Koa/...) middlewares: [one middleware](https://github.com/brillout/vite-plugin-ssr/blob/37ca8cc0c7dfef55c0b816812b14cec384fa6a4b/boilerplates/boilerplate-react/server/index.js#L15) that serves the static files living at `dist/client/`, and a [second middleware](https://github.com/brillout/vite-plugin-ssr/blob/37ca8cc0c7dfef55c0b816812b14cec384fa6a4b/boilerplates/boilerplate-react/server/index.js#L24-L31) that server-side renders your pages with `vite-plugin-ssr`'s `const renderPage = createPageRender();`.)

<br/><br/>


### Firebase

> :warning: We recommend reading the [Vue Tour](#vue-tour) or [React Tour](#react-tour) before proceeding with guides.

From an architectural point of view, your `vite-plugin-ssr` app is simply a Node.js application.

This means you can simply follow [Firebase's official guide](https://firebase.google.com/docs/hosting/functions#use_a_web_framework).

(In production, `vite-plugin-ssr` is simply two Express.js(/Fastify/Koa/...) middlewares: [one middleware](https://github.com/brillout/vite-plugin-ssr/blob/37ca8cc0c7dfef55c0b816812b14cec384fa6a4b/boilerplates/boilerplate-react/server/index.js#L15) that serves the static files living at `dist/client/`, and a [second middleware](https://github.com/brillout/vite-plugin-ssr/blob/37ca8cc0c7dfef55c0b816812b14cec384fa6a4b/boilerplates/boilerplate-react/server/index.js#L24-L31) that server-side renders your pages with `vite-plugin-ssr`'s `const renderPage = createPageRender();`.)

<br/><br/>


## API

### `*.page.js`

Environment: `Browser`, `Node.js`
<br/>
[Ext Glob](https://github.com/micromatch/micromatch#extglobs): `/**/*.page.*([a-zA-Z0-9])`

A `*.page.js` file should have a `export { Page }`. (Or a `export default`.)

`Page` represents the page's view that is rendered to HTML / the DOM.

`vite-plugin-ssr` doesn't do anything with `Page` and just passes it untouched to:
 - Your `render({ Page })` hook.
 - The client-side.

```js
// *.page.js
// Environment: Browser, Node.js

export { Page }

// We export a JSX component, but we could as well export a Vue/Svelte/... component,
// or even export some totally custom object since vite-plugin-ssr doesn't do anything
// with `Page`: it just passes it to your `render()` hook and to the client-side.
function Page() {
  return <>Hello</>
}
```

```js
// *.page.server.js
// Environment: Node.js

import { html } from 'vite-plugin-ssr'
import renderToHtml from 'some-view-framework'

export { render }

// `Page` is passed to the `render()` hook
async function render({ Page }) {
  const pageHtml = await renderToHtml(Page)

  return html`<html>
    <body>
      <div id="root">
        ${html.dangerouslySetHtml(pageHtml)}
      </div>
    </body>
  </html>`
}
```
```js
// *.page.client.js
// Environment: Browser

import { getPage } from 'vite-plugin-ssr/client'
import { hydrateToDom } from 'some-view-framework'

hydrate()

async function hydrate() {
  // `Page` is available in the browser.
  const { Page } = await getPage()
  await hydrateToDom(Page)
}
```

The `.page.js` file is lazy-loaded: it is loaded only when needed which means that if no URL request were to match the page's route then `.page.js` is not loaded in your Node.js process nor in the user's browser.

The `.page.js` file is usually executed in both Node.js and the browser.

<br/><br/>


### `pageContext`

The `pageContext` object is the accumulation of:
 - `pageContext.urlPathname`: the URL's pathname (e.g. `/product/42`)
 - `pageContext.urlFull`: ```${pathname}${search}${hash}``` (e.g. `/product/42?details=yes#reviews`)
 - `pageContext.urlParsed`: `{ pathname, search, hash }` (e.g. `{ pathname: 'product/42', search: { details: 'yes' }, hash: 'reviews' }`)
 - `pageContext.routeParams` which contains the route parameters (e.g. `pageContext.routeParams.movieId` for a page with a Route String `/movie/:movieId`)
 - `pageContext` you passed at your server integration point [`createPageRender()`](#import--createpagerender--from-vite-plugin-ssr) (`const renderPage = createPageRender(); renderPage({ pageContext })`)
 - `pageContext` you returned in your page's `addPageContext()` hook (if you defined one)
 - `pageContext` you returned in your `_default.page.server.js`'s `addPageContext()` hook (if you defined one)

By default only `pageContext.urlPathname`, `pageContext.urlFull`, and `pageContext.urlParsed` are available in the browser; use [`export const passToClient: string[]`](#export--passtoclient-) to make more `pageContext` available in the browser.

The `pageContext` can be accessed at:
 - (Node.js) `export function addPageContext({ pageContext })` (`*.page.server.js`)
 - (Node.js) `export function render({ pageContext })` (`*.page.server.js`)
 - (Node.js) `export function prerender({ pageContext })` (`*.page.server.js`)
 - (Node.js (& Browser)) `export default function routeFunction({ pageContext })` (`*.page.route.js`)
 - (Browser) `const { pageContext } = await getPage()` (`import { getPage } from 'vite-plugin-ssr/client'`)
 - (Browser) `useClientRouter({ render({ pageContext }) })` (`import { useClientRouter } from 'vite-plugin-ssr/client/router'`)

<br/><br/>


### `*.page.server.js`

Environment: `Node.js`
<br/>
[Ext Glob](https://github.com/micromatch/micromatch#extglobs): `/**/*.page.server.*([a-zA-Z0-9])`

The `.page.server.js` file defines and exports
- `export { addPageContext }`
- `export { passToClient }`
- `export { render }`
- `export { prerender }`

The `.page.server.js` file is lazy-loaded: it is loaded only when needed which means that if no URL request were to match the page's route then `.page.server.js` is not loaded in your Node.js process' memory.

The `.page.server.js` file is executed in Node.js and never in the browser.

<br/>

#### `export { addPageContext }`

The `addPageContext()` hook is used to provide further `pageContext` values.

The `pageContext` is passed to all hooks (defined in `.page.server.js`) and all Route Functions (defined in `.page.route.js`).

You can provide initial `pageContext` values at your server integration point [`createPageRender()`](#import--createpagerender--from-vite-plugin-ssr).
This is where you usually pass information about the authenticated user,
see [Authentication](#authentication) guide.

The `addPageContext()` hook is usually used with [`const passToClient: string[]`](#export--passtoclient-) to fetch data, see [Data Fetching](#data-fetching) guide.

Since `addPageContext()` is always called in Node.js, ORM/SQL database queries can be used.

```js
// /pages/movies.page.server.js

import fetch from "node-fetch";

export { addPageContext }

async function addPageContext({ pageContext, Page }){
  const response = await fetch("https://api.imdb.com/api/movies/")
  const { movies } = await response.json()
  /* Or with an ORM:
  const movies = Movie.findAll() */
  /* Or with SQL:
  const movies = sql`SELECT * FROM movies;` */
  return { movies }
}
```

`Page` is the `export { Page }` (or `export default`) of the `.page.js` file.

<br/>

#### `export { passToClient }`

You can tell `vite-plugin-ssr` what `pageContext` to send to the browser by using `passToClient`.

The `pageContext` is serialized and passed from the server to the browser with [`devalue`](https://github.com/Rich-Harris/devalue).

It is usally used with the `addPageContext()` hook to fetch data:
data is fetched in `async addPageContext()` and then made available to the browser with `passToClient`.

```js
// *.page.server.js
// Environment: Node.js

import fetch from "node-fetch";

export { passToClient }

// Example of `pageContext` often passed to the browser
const passToClient = [
  'pageProps',
  'routeParams',
  // (Deep selection is not implemented yet; open a GitHub ticket if you want this.)
  'user.id',
  'user.name'
]
```

```js
// *.page.client.js
// Environment: Browser

import { getPage } from 'vite-plugin-ssr/client'

hydrate()

async function hydrate() {
  const { Page, pageContext } = await getPage()

  // Thanks to `passToClient`, these `pageContext` are available here in the browser
  pageContext.pageProps
  pageContext.routeParams
  pageContext.user.id
  pageContext.user.name

  /* ... */
}
```

Or when using Client-side Routing:

```js
// *.page.client.js
// Environment: Browser

import { useClientRouter } from 'vite-plugin-ssr/client/router'

useClientRouter({
  render({ Page, pageContext }) {
    // Thanks to `passToClient`, these `pageContext` are available here in the browser
    pageContext.pageProps
    pageContext.routeParams
    pageContext.user.id
    pageContext.user.name

    /* ... */
  }
})
```

<br/>

#### `export { render }`

The `render()` hook defines how a page is rendered to HTML.

It usually returns an HTML string,
but it can also return something else than HTML which we talk more about down below.

```js
// *.page.server.js
// Environment: Node.js

import { html } from 'vite-plugin-ssr'
import { renderToHtml, createElement } from 'some-view-framework'

export { render }

async function render({ Page, pageContext }){
  const pageHtml = await renderToHtml(createElement(Page, pageContext.pageProps))
  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>My SSR App</title>
      </head>
      <body>
        <div id="page-root">${html.dangerouslySetHtml(pageHtml)}</div>
      </body>
    </html>`
}
```

`Page` is the `export { Page }` (or `export default`) of the `.page.js` file being rendered.

The value `renderResult` returned by your `render()` hook doesn't have to be HTML:
`vite-plugin-ssr` doesn't do anything with `renderResult` and just passes it untouched at your server integration point [`createPageRender()`](#import--createpagerender--from-vite-plugin-ssr).

```js
// *.page.server.js

export { render }

function render({ Page, pageContext }) {
  let renderResult
  /* ... */
  return renderResult
}
```
```js
// server.js

const renderPage = createPageRender(/*...*/)

app.get('*', async (req, res, next) => {
  const result = await renderPage({ url: req.originalUrl, pageContext: {} })
  // `result.renderResult` is the value returned by your `render()` hook.
  const { renderResult } = result
  /* ... */
})
```

Your `render()` hook can for example return an object like `{ redirectTo: '/some/url' }` in order to do [Page Redirection](#page-redirection).

<br/>

#### `export { prerender }`

> :asterisk: Check out the [Pre-rendering Guide](#pre-rendering) to get an overview about pre-rendering.

The `prerender()` hook enables parameterized routes (e.g. `/movie/:movieId`) to be pre-rendered:
by defining the `prerender()` hook you provide the list of URLs (`/movie/1`, `/movie/2`, ...) and (optionally) the `pageContext` of each URL.

If you don't have any parameterized route,
then you can prerender your app without defining any `prerender()` hook.
You can, however, still use the `prerender()` hook
to increase the effeciency of pre-rendering as
it enables you to fetch data for multiple pages at once.

```js
// /pages/movie.page.route.js
// Environment: Node.js

export default '/movie/:movieId`
```
```js
// /pages/movie.page.server.js
// Environment: Node.js

export { prerender }

async function prerender() {
  const movies = await Movie.findAll()

  const moviePages = (
    movies
    .map(movie => {
      const url = `/movie/${movie.id}`
      const pageContext = { movie }
      return {
        url,
        // Beacuse we already provide the `pageContext`, vite-plugin-ssr will *not* call
        // any `addPageContext()` hook for `url`.
        pageContext
      }
      // We could also only return `url`. In that case vite-plugin-ssr would call
      // `addPageContext()`. But that would be wasteful since we already have all
      // the data of all movies from our `await Movie.findAll()` call.
      // return { url }
    })
  )

  // We can also return URLs that don't match the page's route.
  // That way we can provide the `pageContext` of other pages.
  // Here we provide the `pageContext` of the `/movies` page since
  // we already have the data.
  const movieListPage = {
    url: '/movies', // The `/movies` URL doesn't belong to the page's route `/movie/:movieId`
    pageContext: {
      movieList: movies.map(({id, title}) => ({id, title})
    }
  }

  return [movieListPage, ...moviePages]
}
```

The `prerender()` hook is only used when pre-rendering:
if you don't call
`vite-plugin-ssr prerender`
then no `prerender()` hook is called.

Vue Example:
 - [/examples/vue/package.json](examples/vue/package.json) (see the `build:prerender` script)
 - [/examples/vue/pages/star-wars/index.page.server.ts](examples/vue/pages/star-wars/index.page.server.ts) (see the `prerender()` hook)
 - [/examples/vue/pages/hello/index.page.server.ts](examples/vue/pages/hello/index.page.server.ts) (see the `prerender()` hook)

React Example:
 - [/examples/react/package.json#build:prerender](examples/react/package.json) (see the `build:prerender` script)
 - [/examples/react/pages/star-wars/index.page.server.ts](examples/react/pages/star-wars/index.page.server.ts) (see the `prerender()` hook)
 - [/examples/react/pages/hello/index.page.server.ts](examples/react/pages/hello/index.page.server.ts) (see the `prerender()` hook)

<br/><br/>


### `import { html } from 'vite-plugin-ssr'`

Environment: `Node.js`

The `html` tag sanitizes HTML (to prevent XSS injections).
It is usually used in your `render()` hook defined in `.page.server.js`.

```js
// *.page.server.js
// Environment: Node.js

import { html } from 'vite-plugin-ssr'

export { render }

async function render() {
  const title = 'Hello<script src="https://devil.org/evil-code"></script>'
  const pageHtml = "<div>I'm already <b>sanitized</b>, e.g. by Vue/React</div>"

  // This HTML is safe thanks to the string template tag `html` which sanitizes `title`
  return html`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="page-root">${html.dangerouslySetHtml(pageHtml)}</div>
      </body>
    </html>`
}
```

All strings, e.g. `title`, are automatically sanitized (technically speaking: HTML-escaped)
so that you can safely include untrusted strings
such as user-generated text.

The `html.dangerouslySetHtml(str)` function injects the string `str` as-is *without* sanitizing.
It should be used with caution and
only for HTML strings that are guaranteed to be already sanitized.
It is usually used to include HTML generated by React/Vue/Solid/... as these frameworks always generate sanitized HTML.
If you find yourself using `html.dangerouslySetHtml()` in other situations be extra careful as you run into the risk of creating a security breach.

You can assemble the overall HTML document from several pieces of HTML segments.
For example, when you want some HTML parts to be included only for certain pages:

```js
// _default.page.server.js
// Environment: Node.js

import { html } from 'vite-plugin-ssr'
import { renderToHtml } from 'some-view-framework'

export { render }

async function render({ Page, pageContext }) {
  // We only include the `<meta name="description">` tag if the page has a description.
  // (Pages define `pageContext.documentProps.description` with their `addPageContext()` hook.)
  const description = pageContext.documentProps?.description
  let descriptionTag = ''
  if( description ) {
    // Note how we use the `html` string template tag for an HTML segment.
    descriptionTag = html`<meta name="description" content="${description}">`
  }

  // We use the `html` tag again for the overall HTML, and since `descriptionTag` is
  // already sanitized it will not be sanitized again.
  return html`<html>
    <head>
      ${descriptionTag}
    </head>
    <body>
      <div id="root">
        ${html.dangerouslySetHtml(await renderToHtml(Page))}
      </div>
    </body>
  </html>`
}
```

<br/><br/>


### `*.page.client.js`

Environment: `Browser`
<br/>
[Ext Glob](https://github.com/micromatch/micromatch#extglobs): `/**/*.page.client.*([a-zA-Z0-9])`

The `.page.client.js` file defines the page's browser-side code.

It represents the *entire* browser-side code. This means that if you create an empty `.page.client.js` file, then the page has zero browser-side JavaScript.
(Except of Vite's dev code when not in production.)

This also means that you have full control over the browser-side code. Not only can you render/hydrate your pages as you wish, but you can also easily & naturally integrate browser libraries.

```js
// *.page.client.js

import { getPage } from 'vite-plugin-ssr/client'
import { hydrateToDom, createElement } from 'some-view-framework'
import GoogleAnalytics from '@brillout/google-analytics'

main()

async function main() {
  analytics_init()
  analytics.event('[hydration] begin')
  await hydrate()
  analytics.event('[hydration] end')
}

async function hydrate() {
  const { Page, pageContext } = await getPage()
  await hydrateToDom(
    createElement(Page, pageContext.pageProps),
    document.getElementById('view-root')
  )
}

let analytics
function analytics_init() {
  analytics = new GoogleAnalytics('UA-121991291')
}
```

<br/>

### `import { getPage } from 'vite-plugin-ssr/client'`

Environment: `Browser`

The `async getPage()` function provides `Page` and `pageContext` to the browser-side.

```js
// *.page.client.js

import { getPage } from 'vite-plugin-ssr/client'

hydrate()

async function hydrate() {
  const { Page, pageContext } = await getPage()
  /* ... */
}
```

- `Page` is the `export { Page }` (or `export default`) of the `/pages/demo.page.js` file.
- `pageContext` is a subset of the `pageContext` defined on the server-side; the `passToClient` determines what `pageContext` is sent to the browser.

The `pageContext` is serialized and passed from the server to the browser with [`devalue`](https://github.com/Rich-Harris/devalue).

In development `getPage()` dynamically `import()` the page, while in production the page is preloaded (with `<link rel="preload">`).

<br/>

### `import { useClientRouter } from 'vite-plugin-ssr/client/router'`

Environment: `Browser`

By default, `vite-plugin-ssr` does Server-side Routing.
You can do Client-side Routing instead by using `useClientRouter()`.

```js
// *.page.client.js
// Environment: Browser

import { renderToDom, hydrateToDom, createElement } from 'some-view-framework'
import { useClientRouter } from 'vite-plugin-ssr/client/router'

const { hydrationPromise } = useClientRouter({
  async render({ Page, pageContext, isHydration }) {
    const page = createElement(Page, pageContext)
    const container = document.getElementById('page-view')

    // Render the page
    if (isHydration) {
      // This is the first page rendering; the page has been rendered to HTML
      // and we now make it interactive.
      await hydrateToDom(page)
    } else {
      // Render a new page
      await renderToDom(page)
    }

    // We use `pageContext.documentProps.title` to update `<title>`.
    // (Make sure to add it to `export const passToClient = ['pageProps, 'documentProps']`,
    // and your pages can then return `documentProps` in their `addPageContext()` hook.)
    document.title =
      pageContext.documentProps?.title ||
      // A default title
      'Demo'
  },
  onTransitionStart,
  onTransitionEnd
})

hydrationPromise.then(() => {
  console.log('Hydration finished; page is now interactive.')
})

function onTransitionStart() {
  console.log('Page transition start')
  // For example:
  document.body.classList.add('page-transition')
}
function onTransitionEnd() {
  console.log('Page transition end')
  // For example:
  document.body.classList.remove('page-transition')
}
```

You can keep your `<a href="/some-url">` links as they are: link clicks are intercepted.
You can also use
[`import { navigate } from 'vite-plugin-ssr/client/router'`](#import--navigate--from-vite-plugin-ssrclientrouter)
to programmatically navigate your user to a new page.

By default, the Client-side Router scrolls the page to the top upon page transitions;
use `<a keep-scroll-position />` / `navigate(url, { keepScrollPosition: true })`
if you want to preserve the scroll position instead. (Useful for [Nested Routes](#nested-routes).)

`useClientRouter()` is fairly high-level, if you need lower-level control, then open a GitHub issue.

Vue example:
 - [/examples/vue/pages/_default/_default.page.client.ts](examples/vue/pages/_default/_default.page.client.ts)
 - [/examples/vue/pages/_default/app.ts](examples/vue/pages/_default/app.ts)
 - [/examples/vue/pages/index.page.vue](examples/vue/pages/index.page.vue) (example of using `import { navigate } from "vite-plugin-ssr/client/router"`)

React example:
 - [/examples/react/pages/_default/_default.page.client.tsx](examples/react/pages/_default/_default.page.client.tsx)
 - [/examples/react/pages/index.page.tsx](examples/react/pages/index.page.tsx) (example of using `import { navigate } from "vite-plugin-ssr/client/router"`)

<br/><br/>


### `import { navigate } from 'vite-plugin-ssr/client/router'`

Environment: `Browser`, `Node.js`. (In Node.js `navigate()` is importable but not callable.)

You can use `navigate('/some-url')` to programmatically navigate your user to another page (i.e. when navigation isn't triggered by the user clicking on an anchor tag `<a>`).
For example, you can use `navigate()` to redirect your user after a successful form submission.

```jsx
import { navigate } from "vite-plugin-ssr/client/router";

// Some deeply nested view component
function Form() {
   return (
     <form onSubmit={onSubmit}>
       {/*...*/}
     </form>
   );
}

async function onSubmit() {
  /* ...  */

  const navigationPromise = navigate('/form/success');

  console.log("The URL changed but the new page hasn't rendered yet.");
  await navigationPromise
  console.log("The new page has finished rendering.");
}
```

While you can import `navigate()` in Node.js, you cannot call it: calling `navigate()` in Node.js throws a `[Wrong Usage]` error.
(`vite-plugin-ssr` allows you to import `navigate()` in Node.js because with SSR your view components are loaded in the browser as well as Node.js.)

If you want to redirect your user at page-load time, see the [Page Redirection](#page-redirection) guide.

Options:
 - `navigate('/some-url, { keepScrollPosition: true })`: Do not scroll to the top of the page; keep scroll position where it is instead. (Useful for [Nested Routes](#nested-routes).) (You can also use `<a href="/some-url" keep-scroll-position />`.)

Vue example:
 - [/examples/vue/pages/index.page.vue](examples/vue/pages/index.page.vue)

React example:
 - [/examples/react/pages/index.page.tsx](examples/react/pages/index.page.tsx)

<br/><br/>


### `*.page.route.js`

Environment: `Node.js` (and `Browser` if you call `useClientRouter()`)
<br/>
[Ext Glob](https://github.com/micromatch/micromatch#extglobs): `/**/*.page.route.*([a-zA-Z0-9])`

The `*.page.route.js` files enable further control over routing with:
 - Route Strings
 - Route Functions

<br/>

#### Route String

For a page `/pages/film.page.js`, a Route String can be defined in a `/pages/film.page.route.js` adjacent file.

```js
// /pages/film.page.route.js

// Match URLs `/film/1`, `/film/2`, ...
export default '/film/:filmId'
```

If the URL matches, the value of `filmId` is available at `pageContext.routeParams.filmId`.

The syntax of Route Strings is based on [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp)
(the most widespread route syntax in JavaScript).
For user friendlier docs, check out the [Express.js Routing Docs](https://expressjs.com/en/guide/routing.html#route-parameters)
(Express.js uses `path-to-regexp`).

<br/>

#### Route Function

Route Functions give you full programmatic flexibility to define your routing logic.

```js
// /pages/film/admin.page.route.js

export default ({ url, pageContext }) {
  // Route Functions allow us to implement advanced routing such as route guards.
  if (! pageContext.user.isAdmin) {
    return false
  }
  // We can use RegExp and any JavaScript tool we want.
  if (! /\/film\/[0-9]+\/admin/.test(url)) {
    return { match: false } // equivalent to `return false`
  }
  filmId = url.split('/')[2]
  return {
    match: true,
    // We make `filmId` available at `pageContext.routeParams.filmId`
    routeParams: { filmId }
  }
}
```

The `match` value can be a (negative) number which enables you to resolve route conflicts;
the higher the number, the higher the priority.

<br/><br/>


### Filesystem Routing

By default a page is mapped to a URL based on where its `.page.js` file is located.

```
FILESYSTEM                        URL              COMMENT
pages/about.page.js               /about
pages/index/index.page.js         /                (`index` is mapped to the empty string)
pages/HELLO.page.js               /hello           (Mapping is done lower case)
```

The `pages/` directory is optional and you can save your `.page.js` files wherever you want.

```
FILESYSTEM                        URL
user/list.page.js                 /user/list
user/create.page.js               /user/create
todo/list.page.js                 /todo/list
todo/create.page.js               /todo/create
```

The directory common to all your `*.page.js` files is considered the routing root.

For more control over routing, define Route Strings or Route Functions in [`*.page.route.js`](#pageroutejs).

<br/><br/>


### `_default.page.*`

The `_default.page.server.js` and `_default.page.client.js` files are like regular `.page.server.js` and `.page.client.js` files, but they are special in the sense that they don't apply to a single page file; instead, they apply as a default to all pages.

There can be several `_default`:

```
marketing/_default.page.server.js
marketing/_default.page.client.js
marketing/index.page.js
marketing/about.page.js
marketing/jobs.page.js
admin-panel/_default.page.server.js
admin-panel/_default.page.client.js
admin-panel/index.page.js
```

The `marketing/_default.page.*` files apply to the `marketing/*.page.js` files, while
the `admin-panel/_default.page.*` files apply to the `admin-panel/*.page.js` files.

The `_default.page.server.js` and `_default.page.client.js` files are not adjacent to any `.page.js` file:
defining `_default.page.js` or `_default.page.route.js` is forbidden.

<br/><br/>


### `_error.page.*`

The page `_error.page.js` is used for when an error occurs:
 - When no page matches the URL (acting as a `404` page).
 - When one of your `.page.*` files throws an error (acting as a `500` page).

`vite-plugin-ssr` automatically sets `pageContext.pageProps.is404: boolean` allowing you to decided whether to show a `404` or `500` page.
(Normally `pageContext.pageProps` is completely defined/controlled by you and `vite-plugin-ssr`'s source code doesn't know anything about `pageContext.pageProps` but this is the only exception.)

You can define `_error.page.js` like any other page and create `_error.page.client.js` and `_error.page.server.js`.

<br/><br/>


### `import { createPageRender } from 'vite-plugin-ssr'`

Environment: `Node.js`

`createPageRender()` is the integration point between your server and `vite-plugin-ssr`.

```js
// server/index.js

// In this example we use Express.js but we could use any other server framework.
const express = require('express')
const { createPageRender } = require('vite-plugin-ssr')

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`
const base = '/'

startServer()

async function startServer() {
  const app = express()

  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`, { index: false }))
  } else {
    const vite = require('vite')
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true }
    })
    app.use(viteDevServer.middlewares)
  }

  const renderPage = createPageRender({ viteDevServer, isProduction, root, base })
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContext = {}
    const result = await renderPage({ url, pageContext })
    if (result.nothingRendered) return next()
    res.status(result.statusCode).send(result.renderResult)
  })

  const port = 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
```

- `viteDevServer` is the Vite dev server.
- `isProduction` is a boolean. When set to `true`, `vite-plugin-ssr` loads already-transpiled code from `dist/` instead of on-the-fly transpiling code.
- `root` is the absolute path of your app's root directory. The `root` directory is usally the directory where `vite.config.js` lives. Make sure that all your `.page.js` files are descendent of the `root` directory.
- `base` is the [Base URL](#base-url).
- `result.nothingRendered` is `true` when a) an error occurred while rendering `_error.page.js`, or b) you didn't define an `_error.page.js` and no `.page.js` matches the `url`.
- `result.statusCode` is either `200`, `404`, or `500`.
- `result.renderResult` is the value returned by the `render()` hook.

Since `createPageRender()` and `renderPage()` are agnostic to Express.js, you can use `vite-plugin-ssr` with any server framework (Koa, Hapi, Fastify, vanilla Node.js, ...) and any deploy environment such as Cloudflare Workers.

Examples:
 - [JavaScript](boilerplates/boilerplate-vue/server/index.js)
 - [TypeScript](boilerplates/boilerplate-vue-ts/server/index.ts)

<br/><br/>


### `import ssr from 'vite-plugin-ssr/plugin'`

Environment: `Node.js`

The plugin has no options.

```js
// vite.config.js

const ssr = require('vite-plugin-ssr/plugin')

module.exports = {
  // Make sure to include `ssr()` and not `ssr`.
  plugins: [ssr()]
}
```

<br/><br/>


### Command `prerender`

The command `prerender` does pre-rendering, see [Pre-rendering](#pre-rendering).

It can be called:
 - As CLI command: `$ npx vite-plugin-ssr prerender` / `$ yarn vite-plugin-ssr prerender`.
 - As JavaScript API: `import { prerender } from 'vite-plugin-ssr/cli`.

Options:
 - `partial`: Allow only a subset of pages to be pre-rendered. (Pages with a parameterized route cannot be pre-rendered without `prerender()` hook; the `--partial` option suppresses the warning telling you about pages not being pre-rendered.)
 - `root`: The root directory of your project (where `vite.config.js` and `dist/` live). Default: `process.cwd()`.

Options are passed like this:
 - CLI: `$ vite-plugin-ssr prerender --partial --root path/to/root`
 - API: `prerender({ partial: true, root: 'path/to/root' })`

<br/><br/>


