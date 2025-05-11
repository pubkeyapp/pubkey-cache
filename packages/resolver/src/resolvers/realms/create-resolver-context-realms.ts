import { NetworkCluster } from '../../types/network-cluster';
import { ResolverConfigType } from '../../types/resolver-config-type';
import { ResolverContext } from '../../types/resolver-context';
import { ResolverConfigRealms } from './types/resolver-config-realms';
import { ResolverConfigRealmsInput } from './types/resolver-config-realms-input';
import { validateResolverConfigRealms } from './validate-resolver-config-realms';

export function createResolverContextRealms(input: ResolverConfigRealmsInput): ResolverContext<ResolverConfigRealms> {
    const config = validateResolverConfigRealms(input);

    return {
        clusters: [NetworkCluster.SolanaDevnet, NetworkCluster.SolanaMainnet],
        config,
        provides: [ResolverConfigType.Realms],
    };
}
