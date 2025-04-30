import { server } from '@pubkey-cache/server'

import { getConfig } from './lib/get-config'
import { getContext } from './lib/get-context'

const config = getConfig()
const context = getContext()

await server({
  hostname: config.hostname,
  port: config.port,
  resolvers: config.resolvers,
  storage: context.storage,
})
