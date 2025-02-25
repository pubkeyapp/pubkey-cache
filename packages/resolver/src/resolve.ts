import { resolverHeliusNftHolders } from './resolvers/resolver-helius-nft-holders';
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
        case 'helius-nft-holders':
            return resolverHeliusNftHolders({ collection: resolver.address, helius: context.helius, verbose });
        case 'helius-token-holders':
            return resolverHeliusTokenHolders({ helius: context.helius, mint: resolver.address, verbose });
        default:
            throw new Error(`Unknown resolver type: ${resolver.type}`);
    }
}
