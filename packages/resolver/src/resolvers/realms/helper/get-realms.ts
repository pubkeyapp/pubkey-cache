import { Connection } from '@solana/web3.js';

import { ResolverConfigRealms } from '../types/resolver-config-realms';

export function getRealms({ endpoint, realm, type }: ResolverConfigRealms) {
    return {
        connection: new Connection(endpoint, 'confirmed'),
        getRealmsVoteAccounts: async () => {
            //
        },
        realm,
        type,
    };
}

export type Realms = ReturnType<typeof getRealms>;
