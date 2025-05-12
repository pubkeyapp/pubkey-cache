import { getGovernanceAccounts, pubkeyFilter, TokenOwnerRecord } from '@solana/spl-governance';
import { PublicKey } from '@solana/web3.js';

import { ResolveResult } from '../../types/resolve-result';
import { ResolveResultPage } from '../../types/resolve-result-page';
import { ResolverContextRealmsInstance } from './types/resolver-context-realms-instance';

export interface ResolveRealmsCollectionAssetsParams {
    realm: string;
    tokenMint: string;
}

export interface RealmsResultPage {
    items: unknown[];
    page: number;
}

export async function resolverRealmsGovernanceAccounts({
    handler,
    instance,
    params,
}: {
    handler: (page: ResolveResultPage<TokenOwnerRecord>) => Promise<boolean> | boolean;
    instance: ResolverContextRealmsInstance;
    params: ResolveRealmsCollectionAssetsParams;
}): Promise<ResolveResult> {
    //
    const res: ResolveResult = {
        errors: [],
        limit: 1000,
        logs: [],
        pages: 0,
        total: 0,
    };

    const filter1 = pubkeyFilter(1, new PublicKey(params.realm));
    const filter2 = pubkeyFilter(1 + 32, new PublicKey(params.tokenMint));

    if (!(filter1 && filter2)) {
        throw new Error('Unable to create filters to getGovernanceAccounts');
    }

    const governanceAccounts = await getGovernanceAccounts(
        instance.realms.connection,
        new PublicKey(instance.context.config.programId),
        TokenOwnerRecord,
        [filter1, filter2],
    );

    await handler({ items: governanceAccounts.map(governanceAccount => governanceAccount.account), page: 1 });
    res.pages++;

    return res;
}
