import pico from 'picocolors'

import { Command } from './command'

export const commandHelp: Command = {
  action: () => {
    return [null, pico.yellow(`I'm not helpful but you could add some help here.`)]
  },
  description: 'Show help',
  name: 'help',
}
