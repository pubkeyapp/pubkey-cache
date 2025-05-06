import { z } from 'zod';

import { ResolverConfigSolanaClientSchema } from '../resolver-config-solana-client-schema';

export type ResolverConfigSolanaClientType = z.infer<typeof ResolverConfigSolanaClientSchema>;
