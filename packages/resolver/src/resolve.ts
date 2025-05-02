import { resolverHeliusCollectionAssets } from './resolvers/resolver-helius-collection-assets';
import { resolverHeliusCollectionHolders } from './resolvers/resolver-helius-collection-holders';
import { resolverHeliusTokenAccounts } from './resolvers/resolver-helius-token-accounts';
import { resolverHeliusTokenHolders } from './resolvers/resolver-helius-token-holders';
import { Resolver } from './types/resolver';
import { ResolverContext } from './types/resolver-context';

export function resolve({
    context,
    resolver,
    verbose,
}: {
    context: ResolverContext;
    resolver: Resolver;
    verbose?: boolean;
}) {
    switch (resolver.type) {
        case 'helius-collection-assets':
            return resolverHeliusCollectionAssets({ collection: resolver.address, helius: context.helius, verbose });
        case 'helius-collection-holders':
            return resolverHeliusCollectionHolders({ collection: resolver.address, helius: context.helius, verbose });
        case 'helius-token-accounts':
            return resolverHeliusTokenAccounts({ helius: context.helius, mint: resolver.address, verbose });
        case 'helius-token-holders':
            return resolverHeliusTokenHolders({ helius: context.helius, mint: resolver.address, verbose });
        default:
            throw new Error(`Unknown resolver type: ${resolver.type}`);
    }
}
