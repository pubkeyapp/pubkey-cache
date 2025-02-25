import prompts from 'prompts'

import { ensureValidPublicKey } from '../lib/ensure-valid-public-key'
import { Context } from '../lib/get-context'
import { Command } from './command'

let previousPublicKey: string | undefined

export const commandBalance: Command = {
  action: async (ctx: Context) => {
    const { publicKey } = await prompts({
      initial: previousPublicKey,
      message: 'Enter a public key',
      name: 'publicKey',
      type: 'text',
      validate: (publicKey) => {
        try {
          ensureValidPublicKey(publicKey)
          return true
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
          return false
        }
      },
    })
    if (publicKey !== previousPublicKey) {
      previousPublicKey = publicKey
    }
    try {
      const address = ensureValidPublicKey(publicKey)
      const balance = await ctx.connection.getBalance(address)

      return [null, `${balance / 10 ** 9} SOL`]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Get the balance for a public key',
  name: 'balance',
}
