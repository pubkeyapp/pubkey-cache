import * as v from 'valibot';

import { ResolverConfigType } from '../../types/resolver-config-type';

export function getResolverConfigRealmsSchema() {
    return v.object({
        cluster: v.optional(v.union([v.literal('mainnet'), v.literal('devnet')]), 'mainnet'),
        realms: v.string(),
        type: v.optional(v.literal(ResolverConfigType.Realms), ResolverConfigType.Realms),
    });
}
