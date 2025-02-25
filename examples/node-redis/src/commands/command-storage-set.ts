import prompts from 'prompts'

import { getContext } from '../lib/get-context'
import { Command } from './command'

let previousKey: string = ''
let previousValue: string = ''

export const commandStorageSet: Command = {
  action: async () => {
    const { storage } = getContext()
    try {
      // Prompt for the key
      const { key } = await prompts({
        initial: previousKey,
        message: 'Key to set',
        name: 'key',
        type: 'text',
      })

      if (key !== previousKey) {
        previousKey = key
      }

      // Prompt for the value
      const { value } = await prompts({
        initial: previousValue,
        message: 'Value to set',
        name: 'value',
        type: 'text',
      })

      if (value !== previousValue) {
        previousValue = value
      }

      // Prompt for the ttl
      const { ttl } = await prompts({
        message: 'TTL in seconds',
        name: 'ttl',
        type: 'number',
      })

      await storage.set(key, value, { ttl })

      return [null, null]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Set a key in the storage',
  name: 'storage-set',
}
