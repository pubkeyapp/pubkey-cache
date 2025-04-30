import prompts from 'prompts'

import { getContext } from '../lib/get-context'
import { Command } from './command'

let previousValue: string = ''

export const commandStorageGet: Command = {
  action: async () => {
    const { storage } = getContext()
    try {
      const { key } = await prompts({
        initial: previousValue,
        message: 'Key to get',
        name: 'key',
        type: 'text',
      })

      if (key !== previousValue) {
        previousValue = key
      }

      const value = await storage.get(key)

      return [null, value as object]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Get a key from the storage',
  name: 'storage-get',
}
