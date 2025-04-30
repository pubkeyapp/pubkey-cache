import pico from 'picocolors'
import prompts from 'prompts'

import { Command } from './command'

export const commandHello: Command = {
  action: async () => {
    try {
      const { name } = await prompts({
        message: "What's your name?",
        name: 'name',
        type: 'text',
        validate: (name) => name.length > 0,
      })

      return [null, pico.blue(`Hello ${pico.green(name)}!`)]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Say hello',
  name: 'hello',
}
