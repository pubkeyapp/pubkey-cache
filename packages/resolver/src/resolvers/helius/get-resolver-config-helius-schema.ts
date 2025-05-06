import * as v from 'valibot';

import { ResolverConfigType } from '../../types/resolver-config-type';

export function getResolverConfigHeliusSchema() {
    return v.object({
        heliusApiKey: v.pipe(v.string(), v.uuid()),
        heliusCluster: v.optional(v.union([v.literal('mainnet-beta'), v.literal('devnet')]), 'mainnet-beta'),
        type: v.optional(v.literal(ResolverConfigType.Helius), ResolverConfigType.Helius),
    });
}
