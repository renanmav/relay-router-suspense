# Relay Router Suspense

This is a library to smooth transition to fetch-as-you-render strategy. This implementation is highly based on [issue-tracker](https://github.com/relayjs/relay-examples/tree/master/issue-tracker) example of @josephsavona, using react-router and experimental versions of react, react-dom and react-relay.

## Get started

Install it with `yarn` or `npm`
```bash
yarn add relay-router-suspense
npm i relay-router-suspense
```

Then checkout [`example`](https://github.com/renanmav/relay-router-suspense/tree/master/example) or read the [API](https://github.com/renanmav/relay-router-suspense#api)

## API

### createRouter

Used to generate the `router` based on a router config array.

```ts
createRouter(
  routes: RouteConfig[], 
  options?: BrowserHistoryBuildOptions
): {
  cleanup: import("history").UnregisterCallback;
  context: Router;
}
```

For example:

```ts
import { RouteConfig, createRouter } from 'relay-router-suspense'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: JSResource('App', () => import('./App')),   // code split JS code
    prepare: () => ({                                      // prepare function
      rootQuery: preloadQuery<AppQuery>(
        RelayEnvironment,
        PreloadRootQuery,
        { foo: 'bar' },
        { fetchPolicy: 'store-or-network' },
      ),
    }),
  }
]

const router = createRouter(routes)
```

### RoutingContext

Create a router store of the following form:

```ts
interface Router {
  history: History<any>
  get: () => Route
  preloadCode: (pathname: string) => void
  preload: (pathname: string) => void
  subscribe: (callback: (arg: Route) => void) => () => void
}
```

Use it combined with `createRouter`, for example:

```ts
const router = createRouter(routes)
...
<RoutingContext.Provider value={router.context}>
  <SomeRouteComponent />
</RoutingContext.Provider>
```
