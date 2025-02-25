import 'dotenv/config'

import { parseResolverString, Resolver } from '@pubkey-cache/resolver'
import { Commitment } from '@solana/web3.js'

export type Config = {
  commitment: Commitment
  discordWebhookUrl?: string
  heliusApiKey: string
  hostname: string
  port: number
  redisUrl: string
  resolvers: Resolver[]
  verbose: boolean
}

export function getConfig(): Config {
  const config = {
    commitment: 'confirmed',
    discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL ?? undefined,
    heliusApiKey: process.env.HELIUS_API_KEY,
    hostname: process.env.HOSTNAME ?? 'localhost',
    port: Number(process.env.PORT ?? '3080'),
    redisUrl: process.env.REDIS_URL,
    resolvers: parseResolverString(process.env.RESOLVERS),
    verbose: process.env.VERBOSE?.trim()?.toLowerCase() === 'true',
  }

  if (!config.heliusApiKey) {
    throw new Error('HELIUS_API_KEY is not set')
  }
  if (!config.redisUrl) {
    throw new Error('REDIS_URL is not set')
  }
  if (!config.resolvers || !config.resolvers.length) {
    throw new Error('RESOLVERS is not set')
  }

  return config as Config
}
