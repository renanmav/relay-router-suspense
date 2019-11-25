import React from 'react'
import ReactDOM from 'react-dom'
import {
  createRouter,
  RoutingContext,
  RouteRenderer,
} from 'relay-router-suspense'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

import RelayEnvironment from './RelayEnvironment'
import routes from './routes'

const router = createRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <RoutingContext.Provider value={router.context}>
      {/* Render the active route */}
      <RouteRenderer
        LoadingComponent={() => <div>Loading...</div>}
        transitionConfig={{ timeoutMs: 2000 }}
      />
    </RoutingContext.Provider>
  </RelayEnvironmentProvider>,
)
