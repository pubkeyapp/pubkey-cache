import { resolveHeliusCollectionAssets, resolveHeliusTokenAccounts, Resolver } from '@pubkey-cache/resolver'
import { ResolverContextHeliusInstance } from '@pubkey-cache/resolver/src/resolvers/helius/types/resolver-context-helius-instance'

export async function resolve({
  handler,
  instance,
  resolver,
}: {
  handler: (data: unknown) => boolean
  instance: ResolverContextHeliusInstance
  resolver: Resolver
}) {
  switch (resolver.type) {
    case 'helius-collection-assets':
      return await resolveHeliusCollectionAssets({
        handler,
        instance,
        params: { collection: resolver.address },
      })
    case 'helius-token-accounts':
      return await resolveHeliusTokenAccounts({
        handler,
        instance,
        params: { mint: resolver.address },
      })
    default:
      throw new Error(`Unknown resolver type: ${resolver.type}`)
  }
}
