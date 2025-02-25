import prompts from 'prompts'

import { getContext } from '../lib/get-context'
import { Command } from './command'

let previousValue: string = ''

export const commandStorageKeys: Command = {
  action: async () => {
    const { storage } = getContext()
    try {
      const { path } = await prompts({
        initial: previousValue,
        message: 'Path to the keys',
        name: 'path',
        type: 'text',
      })

      if (path !== previousValue) {
        previousValue = path
      }

      const keys = await storage.keys(path)

      return [null, keys]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Get the keys from the storage',
  name: 'storage-keys',
}
