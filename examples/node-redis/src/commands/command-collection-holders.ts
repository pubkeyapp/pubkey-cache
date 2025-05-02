import { resolverHeliusCollectionHolders } from '@pubkey-cache/resolver'
import prompts from 'prompts'

import { ensureValidPublicKey } from '../lib/ensure-valid-public-key'
import { getConfig } from '../lib/get-config'
import { Context } from '../lib/get-context'
import { Command } from './command'

let previousValue: string | undefined
const config = getConfig()

export const commandCollectionHolders: Command = {
  action: async (ctx: Context) => {
    const { collection } = await prompts({
      initial: previousValue,
      message: 'Enter the public key of the collection',
      name: 'collection',
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
    if (collection !== previousValue) {
      previousValue = collection
    }
    try {
      ensureValidPublicKey(collection)
      const result = await resolverHeliusCollectionHolders({
        collection,
        helius: ctx.helius,
        verbose: config.verbose,
      })

      return [null, result]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Get the holders of an NFT collection',
  name: 'collection-holders',
}
