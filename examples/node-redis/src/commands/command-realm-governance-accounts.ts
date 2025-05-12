import {
  createResolverContextRealms,
  createResolverContextRealmsInstance,
  resolverRealmsGovernanceAccounts,
} from '@pubkey-cache/resolver'
import prompts from 'prompts'

import { ensureValidPublicKey } from '../lib/ensure-valid-public-key'
import { Command } from './command'

let previousRealms = 'F9V4Lwo49aUe8fFujMbU6uhdFyDRqKY54WpzdpncUSk9'
let previousTokenMint = 'Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a'

export const commandRealmGovernanceAccounts: Command = {
  action: async () => {
    const { realm, tokenMint } = await prompts([
      {
        initial: previousRealms,
        message: 'Enter a realm public key',
        name: 'realm',
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
      },
      {
        initial: previousTokenMint,
        message: 'Enter a governanec token mint public key',
        name: 'tokenMint',
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
      },
    ])
    if (realm !== previousRealms) {
      previousRealms = realm
    }
    if (tokenMint !== previousTokenMint) {
      previousTokenMint = tokenMint
    }
    try {
      const context = createResolverContextRealms({
        endpoint: 'https://mainnet.helius-rpc.com/?api-key=e5a5c85e-ed0f-4831-8bb0-4ddac91cab67',
        realm,
        tokenMint,
      })
      const instance = createResolverContextRealmsInstance(context)

      const items: unknown[] = []
      await resolverRealmsGovernanceAccounts({
        handler: (page) => {
          console.log(`Handling data:`, page)
          items.push(page)
          return true
        },
        instance,
        params: { realm, tokenMint },
      })
      console.log(`Items:`, JSON.stringify(items, null, 2))

      return [null, `Done`]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Get realm governance accounts',
  name: 'realm-governance-accounts',
}
