import { Context } from '../lib/get-context'

export type ActionResult = [Error | null, object | string | null | void]

export type Command = {
  action: (ctx: Context) => ActionResult | Promise<ActionResult>
  description: string
  name: string
}
