import * as v from 'valibot';

import { getResolverConfigSolanaClientSchema } from '../get-resolver-config-solana-client-schema';

export type ResolverConfigSolanaClientType = v.InferOutput<ReturnType<typeof getResolverConfigSolanaClientSchema>>;
