import { NetworkCluster } from '../../types/network-cluster';
import { ResolverConfigType } from '../../types/resolver-config-type';
import { ResolverContext } from '../../types/resolver-context';
import { ResolverConfigSolanaClient } from './types/resolver-config-solana-client';
import { ResolverConfigSolanaClientInput } from './types/resolver-config-solana-client-input';
import { validateResolverConfigSolanaClient } from './validate-resolver-config-solana-client';

export function createResolverContextSolanaClient(
    input: ResolverConfigSolanaClientInput,
): ResolverContext<ResolverConfigSolanaClient> {
    const config = validateResolverConfigSolanaClient(input);

    return {
        clusters: [
            NetworkCluster.SolanaCustom,
            NetworkCluster.SolanaDevnet,
            NetworkCluster.SolanaMainnet,
            NetworkCluster.SolanaTestnet,
        ],
        config,
        provides: [ResolverConfigType.SolanaClient],
    };
}
