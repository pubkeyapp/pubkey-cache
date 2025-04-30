import prompts from 'prompts'

import { getContext } from '../lib/get-context'
import { Command } from './command'

let previousValue: string = ''

export const commandStorageRemove: Command = {
  action: async () => {
    const { storage } = getContext()
    try {
      const { key } = await prompts({
        initial: previousValue,
        message: 'Key to remove',
        name: 'key',
        type: 'text',
      })

      if (key !== previousValue) {
        previousValue = key
      }

      await storage.remove(key)

      return [null, null]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Remove a key from the storage',
  name: 'storage-remove',
}
