import { createSolanaClient } from 'gill';
import { Helius } from 'helius-sdk';

import { createResolverContextHelius } from '../resolvers/helius/create-resolver-context-helius';
import { ResolverContextHeliusInstance } from '../resolvers/helius/types/resolver-context-helius-instance';

export function createMockHeliusInstance(helius: unknown): ResolverContextHeliusInstance {
    return {
        context: createResolverContextHelius({ heliusApiKey: '00000000-0000-0000-0000-000000000000' }),
        helius: helius as Helius,
        solanaClient: createSolanaClient({ urlOrMoniker: 'localnet' }),
    };
}
