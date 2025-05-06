import { z } from 'zod';

import { ResolverConfigType } from '../../types/resolver-config-type';

export const ResolverConfigSolanaClientSchema = z.object({
    cluster: z.enum(['mainnet', 'devnet', 'testnet', 'localnet']).default('mainnet'),
    endpoint: z.string().url(),
    endpointWs: z.string().url().optional(),
    type: z.literal(ResolverConfigType.SolanaClient).default(ResolverConfigType.SolanaClient),
});
