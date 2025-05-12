import * as v from 'valibot';

import { ResolverConfigType } from '../../types/resolver-config-type';

export function getResolverConfigRealmsSchema() {
    return v.object({
        endpoint: v.optional(v.string(), 'https://api.mainnet-beta.solana.com'),
        programId: v.optional(v.string(), 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw'),
        realm: v.string(),
        tokenMint: v.string(),
        type: v.optional(v.literal(ResolverConfigType.Realms), ResolverConfigType.Realms),
    });
}
