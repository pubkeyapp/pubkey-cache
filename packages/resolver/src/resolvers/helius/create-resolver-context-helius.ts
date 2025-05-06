import { NetworkCluster } from '../../types/network-cluster';
import { ResolverConfigType } from '../../types/resolver-config-type';
import { ResolverConfigHeliusInput } from './types/resolver-config-helius-input';
import { ResolverContextHelius } from './types/resolver-context-helius';
import { validateResolverConfigHelius } from './validate-resolver-config-helius';

export function createResolverContextHelius(input: ResolverConfigHeliusInput): ResolverContextHelius {
    const config = validateResolverConfigHelius(input);
    return {
        clusters: [NetworkCluster.SolanaMainnet, NetworkCluster.SolanaDevnet],
        config,
        provides: [ResolverConfigType.Helius, ResolverConfigType.SolanaClient],
    };
}
