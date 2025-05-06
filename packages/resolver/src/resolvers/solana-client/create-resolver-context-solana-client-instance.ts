import { createSolanaClient } from 'gill';

import { ResolverConfigType } from '../../types/resolver-config-type';
import { ResolverContextSolanaClient } from './types/resolver-context-solana-client';
import { ResolverContextSolanaClientInstance } from './types/resolver-context-solana-client-instance';

export function createResolverContextSolanaClientInstance(
    context: ResolverContextSolanaClient,
): ResolverContextSolanaClientInstance {
    if (!context.provides.includes(ResolverConfigType.SolanaClient)) {
        throw new Error(`Context does not provide ResolverConfigType ${ResolverConfigType.SolanaClient}`);
    }
    return {
        context,
        solanaClient: createSolanaClient({ urlOrMoniker: context.config.endpoint }),
    };
}
