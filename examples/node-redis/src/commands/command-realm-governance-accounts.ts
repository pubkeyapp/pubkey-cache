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
    const heliusApiKey = process.env.HELIUS_API_KEY
    if (!heliusApiKey) {
      throw new Error('HELIUS_API_KEY is not set')
    }
    const endpoint = `https://mainnet.helius-rpc.com/?api-key=${heliusApiKey}`
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
          } catch {
            return false
          }
        },
      },
      {
        initial: previousTokenMint,
        message: 'Enter a governance token mint public key',
        name: 'tokenMint',
        type: 'text',
        validate: (publicKey) => {
          try {
            ensureValidPublicKey(publicKey)
            return true
          } catch {
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
      const context = createResolverContextRealms({ endpoint })
      const instance = createResolverContextRealmsInstance(context)

      const items: unknown[] = []
      await resolverRealmsGovernanceAccounts({
        handler: (page) => {
          items.push(...page.items)
          return true
        },
        instance,
        params: { realm, tokenMint },
      })

      return [null, `${JSON.stringify(items.slice(0, 10), null, 2)}... (truncated, ${items.length} total)`]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Get realm governance accounts',
  name: 'realm-governance-accounts',
}
