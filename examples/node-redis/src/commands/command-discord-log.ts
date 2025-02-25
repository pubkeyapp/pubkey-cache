import pico from 'picocolors'
import prompts from 'prompts'

import { getContext } from '../lib/get-context'
import { Command } from './command'

const ctx = getContext()
export const commandDiscordLog: Command = {
  action: async () => {
    try {
      const { name } = await prompts({
        message: "What's your name?",
        name: 'name',
        type: 'text',
        validate: (name) => name.length > 0,
      })

      await ctx.discordLog({
        level: 'info',
        message: `This is a "Hello, ${name}" from the cli`,
        title: 'Test Title',
      })

      return [null, pico.blue(`Hello ${pico.green(name)}!`)]
    } catch (error) {
      return [new Error(error as string), null]
    }
  },
  description: 'Test the discord log',
  name: 'discord-log',
}
