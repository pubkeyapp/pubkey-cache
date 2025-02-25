import { resolverHeliusTokenHolders } from '@pubkey-cache/resolver'
import prompts from 'prompts'

import { ensureValidPublicKey } from '../lib/ensure-valid-public-key'
import { Context } from '../lib/get-context'
import { Command } from './command'

let previousValue: string | undefined

export const commandTokenHolders: Command = {
  action: async (ctx: Context) => {
    const { mint } = await prompts({
      initial: previousValue,
      message: 'Enter the public key of the token mint',
      name: 'mint',
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
    if (mint !== previousValue) {
      previousValue = mint
    }
    try {
      ensureValidPublicKey(mint)
      const result = await resolverHeliusTokenHolders({
        helius: ctx.helius,
        mint,
      })

      return [null, result]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Get the holders of a token',
  name: 'token-holders',
}
