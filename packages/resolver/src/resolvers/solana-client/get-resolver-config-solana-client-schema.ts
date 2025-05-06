import * as v from 'valibot';

import { ResolverConfigType } from '../../types/resolver-config-type';

export function getResolverConfigSolanaClientSchema() {
    return v.object({
        cluster: v.optional(
            v.union([v.literal('mainnet'), v.literal('devnet'), v.literal('testnet'), v.literal('localnet')]),
            'mainnet',
        ),
        endpoint: v.pipe(v.string(), v.url()),
        endpointWs: v.optional(v.pipe(v.string(), v.url())),
        type: v.optional(v.literal(ResolverConfigType.SolanaClient), ResolverConfigType.SolanaClient),
    });
}
