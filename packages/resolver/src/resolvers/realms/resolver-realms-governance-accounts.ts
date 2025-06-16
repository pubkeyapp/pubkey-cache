import { ResolveResult } from '../../types/resolve-result';
import { ResolveResultPage } from '../../types/resolve-result-page';
import { RealmsVoteAccount } from './helper/get-realms-vote-accounts';
import { ResolverContextRealmsInstance } from './types/resolver-context-realms-instance';

export interface ResolveRealmsCollectionAssetsParams {
    realm: string;
    tokenMint: string;
}

export async function resolverRealmsGovernanceAccounts({
    handler,
    instance,
    params,
}: {
    handler: (page: ResolveResultPage<RealmsVoteAccount>) => Promise<boolean> | boolean;
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

    const items = await instance.realms.getRealmsVoteAccounts({ realm: params.realm, tokenMint: params.tokenMint });

    await handler({ items, page: 1 });
    res.pages++;

    return res;
}
