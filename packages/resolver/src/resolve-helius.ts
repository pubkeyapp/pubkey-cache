import { createResolverContextHelius } from './resolvers/helius/create-resolver-context-helius';
import { createResolverContextHeliusInstance } from './resolvers/helius/create-resolver-context-helius-instance';
import { resolveHeliusCollectionAssets } from './resolvers/helius/resolve-helius-collection-assets';
import { resolveHeliusTokenAccounts } from './resolvers/helius/resolve-helius-token-accounts';
import { ResolverConfigHelius } from './resolvers/helius/types/resolver-config-helius';
import { Resolver } from './types/resolver';

export function resolveHelius({ config, resolver }: { config: ResolverConfigHelius; resolver: Resolver }) {
    const context = createResolverContextHelius(config);
    const instance = createResolverContextHeliusInstance(context);
    switch (resolver.type) {
        case 'helius-collection-assets':
            return resolveHeliusCollectionAssets({
                handler: () => true,
                instance,
                params: { collection: resolver.address },
            });
        case 'helius-token-accounts':
            return resolveHeliusTokenAccounts({
                handler: () => true,
                instance,
                params: { mint: resolver.address },
            });
        default:
            throw new Error(`Unknown resolver type: ${resolver.type}`);
    }
}
