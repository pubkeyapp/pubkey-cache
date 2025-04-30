type DiscordLogLevel = 'debug' | 'error' | 'info' | 'warn'

interface DiscordLogOptions {
  level: DiscordLogLevel
  message: string
  title: string
  url?: string
}

export type DiscordLogger = (opts: DiscordLogOptions) => Promise<void>

export interface DiscordLoggerOptions {
  avatarUrl?: string
  username?: string
  webhookUrl?: string
}

const colors: Record<DiscordLogLevel, number> = {
  debug: 0x888888,
  error: 0xff0000,
  info: 0x00aaff,
  warn: 0xffaa00,
}

export function createDiscordLog(options: DiscordLoggerOptions = {}): DiscordLogger {
  // If no webhook URL is provided, return a no-op function
  if (!options.webhookUrl) {
    return async (_opts: DiscordLogOptions) => {
      // Do nothing silently
    }
  }

  const avatarUrl = options.avatarUrl ?? 'https://avatars.githubusercontent.com/u/125477168?v=4'
  const username = options.username ?? 'PubKey Cache'
  const webhookUrl = options.webhookUrl

  // Otherwise, return the real logging function
  return async ({ title, message, level, url }: DiscordLogOptions) => {
    const payload = {
      avatar_url: avatarUrl,
      embeds: [
        {
          color: colors[level],
          description: message,
          timestamp: new Date().toISOString(),
          title,
          url,
        },
      ],
      username,
    }

    try {
      const response = await fetch(webhookUrl, {
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(`Webhook request failed with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Failed to send log to Discord webhook:', error)
      throw error // Let the caller handle it if they want
    }
  }
}
