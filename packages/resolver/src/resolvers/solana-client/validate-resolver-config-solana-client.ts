import * as v from 'valibot';

import { getResolverConfigSolanaClientSchema } from './get-resolver-config-solana-client-schema';
import { ResolverConfigSolanaClient } from './types/resolver-config-solana-client';
import { ResolverConfigSolanaClientInput } from './types/resolver-config-solana-client-input';

export function validateResolverConfigSolanaClient(input: ResolverConfigSolanaClientInput): ResolverConfigSolanaClient {
    return v.parse(getResolverConfigSolanaClientSchema(), {
        ...input,
        endpointWs: input.endpointWs ?? input.endpoint.replace('http', 'ws'),
    });
}
