import { z } from 'zod';

import { ResolverConfigType } from '../../types/resolver-config-type';

export const ResolverConfigHeliusSchema = z.object({
    heliusApiKey: z.string().uuid(),
    heliusCluster: z.enum(['mainnet-beta', 'devnet']).default('mainnet-beta'),
    type: z.literal(ResolverConfigType.Helius).default(ResolverConfigType.Helius),
});
