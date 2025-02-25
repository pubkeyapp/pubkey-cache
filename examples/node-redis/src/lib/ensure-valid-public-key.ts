import { PublicKey } from '@solana/web3.js'

export function ensureValidPublicKey(publicKey: string) {
  try {
    return new PublicKey(publicKey)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw `Invalid public key: ${publicKey}`
  }
}
