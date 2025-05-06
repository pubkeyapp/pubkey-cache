import { Command } from './command'
import { commandBalance } from './command-balance'
import { commandDiscordLog } from './command-discord-log'
import { commandGenesisHash } from './command-genesis-hash'
import { commandHello } from './command-hello'
import { commandHelp } from './command-help'
import { commandResolverSync } from './command-resolver-sync'
import { commandResolverSyncAll } from './command-resolver-sync-all'
import { commandResolvers } from './command-resolvers'
import { commandStorageGet } from './command-storage-get'
import { commandStorageKeys } from './command-storage-keys'
import { commandStorageRemove } from './command-storage-remove'
import { commandStorageSet } from './command-storage-set'

export const commands: Record<string, Command> = {
  'a-resolver-sync-all': commandResolverSyncAll,
  'a-resolver-sync-one': commandResolverSync,
  'a-resolvers': commandResolvers,
  'storage-get': commandStorageGet,
  'storage-keys': commandStorageKeys,
  'storage-remove': commandStorageRemove,
  'storage-set': commandStorageSet,
  'x-balance': commandBalance,
  'x-discord-log': commandDiscordLog,
  'x-genesis-hash': commandGenesisHash,
  'x-hello': commandHello,
  'x-help': commandHelp,
}
