import { ResolverConfigSolanaClientSchema } from './resolver-config-solana-client-schema';
import { ResolverConfigSolanaClient } from './types/resolver-config-solana-client';
import { ResolverConfigSolanaClientInput } from './types/resolver-config-solana-client-input';

export function validateResolverConfigSolanaClient(input: ResolverConfigSolanaClientInput): ResolverConfigSolanaClient {
    return ResolverConfigSolanaClientSchema.parse({
        ...input,
        endpointWs: input.endpointWs ?? input.endpoint.replace('http', 'ws'),
    });
}
