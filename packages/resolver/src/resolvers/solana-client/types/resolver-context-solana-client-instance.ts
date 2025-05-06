import { SolanaClient } from 'gill';

import { ResolverContextSolanaClient } from './resolver-context-solana-client';

export interface ResolverContextSolanaClientInstance {
    context: ResolverContextSolanaClient;
    solanaClient: SolanaClient;
}
