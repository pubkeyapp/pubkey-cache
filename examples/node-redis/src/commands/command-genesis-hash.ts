import { Context } from '../lib/get-context'
import { Command } from './command'

export const commandGenesisHash: Command = {
  action: async (ctx: Context) => {
    try {
      const genesisHash = await ctx.connection.getGenesisHash()

      return [null, genesisHash]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Get the genesis hash',
  name: 'genesis-hash',
}
