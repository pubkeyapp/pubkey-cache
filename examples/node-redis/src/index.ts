import pico from 'picocolors'
import prompts from 'prompts'

import { commands } from './commands'
import { getConfig } from './lib/get-config'
import { getContext } from './lib/get-context'

const choices = [
  ...Object.keys(commands).map((key) => {
    const command = commands[key]
    return { description: command.description, title: command.name, value: key }
  }),
  { description: 'Quit this script', title: 'quit', value: 'quit' },
]

const config = getConfig()
// if (config.verbose) {
// }
console.log(`Verbose mode is ${config.verbose ? 'enabled' : 'disabled'}`)

while (true) {
  const context = getContext()
  const { selected } = await prompts({
    choices,
    message: 'Choose an option:',
    name: 'selected',
    type: 'select',
  })

  if (!selected) {
    console.log(pico.red('No command selected.'))
    continue
  }

  if (selected === 'quit') {
    console.log(pico.yellow('Bye now!'))
    process.exit(0)
  }

  const command = commands[selected]
  if (!command) {
    console.log(pico.red(`Command ${pico.yellow(selected)} not found.`))
    process.exit(1)
  }

  const [error, result] = await command.action(context)
  if (error) {
    console.log(pico.red(`  Error: ${pico.red(error.message)}`))
  }
  if (result) {
    console.log(
      pico.gray(`  Result: ${pico.magenta(typeof result === 'string' ? result : JSON.stringify(result, null, 2))}`),
    )
  }
}
