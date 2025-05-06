import { createResolverContextHelius } from '@pubkey-cache/resolver/src'
import { createResolverContextHeliusInstance } from '@pubkey-cache/resolver/src/resolvers/helius/create-resolver-context-helius-instance'
import prompts from 'prompts'

import { getConfig } from '../lib/get-config'
import { Command } from './command'
import { resolve } from './resolve'

export const commandResolverSync: Command = {
  action: async () => {
    const { resolvers, heliusApiKey } = getConfig()

    try {
      const { selected } = await prompts({
        choices: resolvers.map((resolver) => {
          return { description: resolver.address, title: resolver.type, value: resolver.id }
        }),
        message: 'Select a resolver',
        name: 'selected',
        type: 'select',
      })
      const resolver = resolvers.find((resolver) => resolver.id === selected)

      if (!resolver) {
        return [new Error(`Resolver not found: ${selected}`), null]
      }

      const config = createResolverContextHelius({ heliusApiKey })
      const instance = createResolverContextHeliusInstance(config)

      const items: unknown[] = []
      const result = await resolve({
        handler: (data) => {
          console.log(`Handling data:`, data)
          items.push(data)
          return true
        },
        instance,
        resolver,
      })

      return [null, JSON.stringify({ items, result }, null, 2)]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Sync selected resolver',
  name: 'resolver-sync',
}
