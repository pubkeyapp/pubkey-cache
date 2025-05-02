import { resolve } from '@pubkey-cache/resolver'
import prompts from 'prompts'

import { getConfig } from '../lib/get-config'
import { getContext } from '../lib/get-context'
import { Command } from './command'

export const commandResolverSync: Command = {
  action: async () => {
    const { resolvers, verbose } = getConfig()
    const context = getContext()

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

      await resolve({ context, resolver, verbose })

      return [null, `Synced resolver ${resolver.id}`]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Sync selected resolver',
  name: 'resolver-sync',
}
