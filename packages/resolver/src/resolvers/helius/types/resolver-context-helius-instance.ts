import { SolanaClient } from 'gill';
import { Helius } from 'helius-sdk';

import { ResolverContextHelius } from './resolver-context-helius';

export interface ResolverContextHeliusInstance {
    context: ResolverContextHelius;
    helius: Helius;
    solanaClient: SolanaClient;
}
