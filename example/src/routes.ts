import { RouteConfig, JSResource } from 'relay-router-suspense'
import { preloadQuery } from 'react-relay/hooks'

import RelayEnvironment from './RelayEnvironment'

import PreloadRootQuery, { RootQuery } from './__generated__/RootQuery.graphql'

const routes: RouteConfig[] = [
  {
    component: JSResource('Root', () => import('./Root')),
    prepare: () => ({
      rootQuery: preloadQuery<RootQuery>(
        RelayEnvironment,
        PreloadRootQuery,
        {
          owner: 'facebook',
          name: 'relay',
        },
        // The fetchPolicy allows us to specify whether to render from cached
        // data if possible (store-or-network) or only fetch from network
        // (network-only).
        { fetchPolicy: 'store-or-network' },
      ),
    }),
  },
]

export default routes
