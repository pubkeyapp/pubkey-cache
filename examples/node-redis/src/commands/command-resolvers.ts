import { getConfig } from '../lib/get-config'
import { Command } from './command'

export const commandResolvers: Command = {
  action: () => {
    const { resolvers } = getConfig()

    return [null, resolvers]
  },
  description: 'Show configured resolvers',
  name: 'resolvers',
}
