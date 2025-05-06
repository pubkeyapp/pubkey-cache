import { ResolverType } from '@pubkey-cache/resolver'
import { createResolverContextHelius } from '@pubkey-cache/resolver/src'
import { createResolverContextHeliusInstance } from '@pubkey-cache/resolver/src/resolvers/helius/create-resolver-context-helius-instance'

import { getConfig } from '../lib/get-config'
import { getContext } from '../lib/get-context'
import { Command } from './command'
import { resolve } from './resolve'

export const commandResolverSyncAll: Command = {
  action: async () => {
    const { resolvers, heliusApiKey } = getConfig()
    const context = getContext()
    const startTime = new Date().getTime()
    const results: string[] = []
    const config = createResolverContextHelius({ heliusApiKey })
    const instance = createResolverContextHeliusInstance(config)

    try {
      for (const resolver of resolvers) {
        const startTimeResolver = new Date().getTime()
        const items: unknown[] = []
        if (
          resolver.type === ResolverType['helius-collection-holders'] ||
          resolver.type === ResolverType['helius-token-holders']
        ) {
          await resolve({
            handler: (data) => {
              console.log(`Handling data:`, data)
              items.push(data)
              return true
            },
            instance,
            resolver,
          })

          const endTimeResolver = new Date().getTime()
          const durationResolver = endTimeResolver - startTimeResolver

          results.push(
            `Synced resolver ${resolver.id} took (${durationResolver / 1000} seconds) ${items.length} items resolved`,
          )
          await context.discordLog({
            level: 'info',
            message: `Synced resolver ${resolver.id} took (${durationResolver / 1000} seconds)`,
            title: `Synced ${resolver.type} ${resolver.address}`,
            url: `https://explorer.solana.com/address/${resolver.address}`,
          })
        }
      }

      const endTime = new Date().getTime()
      const duration = endTime - startTime
      results.push(`Duration ${duration / 1000} seconds`)

      return [null, results]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Sync all resolvers',
  name: 'resolver-sync-all',
}
