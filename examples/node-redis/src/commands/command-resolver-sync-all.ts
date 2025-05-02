import { resolve, ResolverType } from '@pubkey-cache/resolver'

import { getConfig } from '../lib/get-config'
import { getContext } from '../lib/get-context'
import { Command } from './command'

export const commandResolverSyncAll: Command = {
  action: async () => {
    const { resolvers, verbose } = getConfig()
    const context = getContext()
    const startTime = new Date().getTime()
    const results: string[] = []

    try {
      for (const resolver of resolvers) {
        const startTimeResolver = new Date().getTime()

        if (
          resolver.type === ResolverType['helius-collection-holders'] ||
          resolver.type === ResolverType['helius-token-holders']
        ) {
          await resolve({ context, resolver, verbose })

          const endTimeResolver = new Date().getTime()
          const durationResolver = endTimeResolver - startTimeResolver

          results.push(`Synced resolver ${resolver.id} took (${durationResolver / 1000} seconds)`)
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
