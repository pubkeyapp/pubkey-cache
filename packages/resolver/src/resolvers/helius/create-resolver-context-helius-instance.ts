import { createSolanaClient } from 'gill';
import { Helius } from 'helius-sdk';

import { ResolverConfigType } from '../../types/resolver-config-type';
import { ResolverContextHelius } from './types/resolver-context-helius';
import { ResolverContextHeliusInstance } from './types/resolver-context-helius-instance';

export function createResolverContextHeliusInstance(context: ResolverContextHelius): ResolverContextHeliusInstance {
    if (!context.provides.includes(ResolverConfigType.Helius)) {
        throw new Error(`Context does not provide ResolverConfigType ${ResolverConfigType.Helius}`);
    }
    const helius = new Helius(context.config.heliusApiKey, context.config.heliusCluster);
    return {
        context,
        helius,
        solanaClient: createSolanaClient({ urlOrMoniker: helius.endpoints.rpc }),
    };
}
