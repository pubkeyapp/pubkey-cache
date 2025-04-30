import { Connection } from '@solana/web3.js'
import { Helius } from 'helius-sdk'
import { Storage } from 'unstorage'

import { createDiscordLog, DiscordLogger } from './discord-log'
import { getConfig } from './get-config'
import { getStorage } from './get-storage'

export interface Context {
  connection: Connection
  discordLog: DiscordLogger
  helius: Helius
  storage: Storage
}

export function getContext(): Context {
  const config = getConfig()
  const discordLog = createDiscordLog({
    avatarUrl: 'https://avatars.githubusercontent.com/u/125477168?v=4',
    username: 'PubKey Cache',
    webhookUrl: config.discordWebhookUrl,
  })
  const helius = new Helius(config.heliusApiKey)
  const storage = getStorage({ redisUrl: config.redisUrl })

  return {
    connection: helius.connection,
    discordLog,
    helius,
    storage,
  }
}
