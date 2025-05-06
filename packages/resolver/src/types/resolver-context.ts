import { NetworkCluster } from './network-cluster';
import { ResolverConfig } from './resolver-config';
import { ResolverConfigType } from './resolver-config-type';

export interface ResolverContext<T = ResolverConfig> {
    clusters: NetworkCluster[];
    config: T;
    provides: ResolverConfigType[];
}
