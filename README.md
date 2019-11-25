# Relay Router Suspense

This is a library to smooth transition to render-as-you-fetch strategy. This implementation is highly based on [issue-tracker](https://github.com/relayjs/relay-examples/tree/master/issue-tracker) example of @josephsavona, using react-router and experimental versions of react, react-dom and react-relay.

# API

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
const routes: RouteConfig[] = [
    {
        path: '/',
        component: JSResource('App', () => import('./App')),
        prepare: () => ({
            rootQuery: preloadQuery<RootQuery>(
                RelayEnvironment,
                PreloadRootQuery,
                { foo: 'bar' },
                { fetchPolicy: 'store-or-network' },
            ),
        }),
    }
]
```