import { DAS } from 'helius-sdk';

import { ResolveResult } from '../../types/resolve-result';
import { ResolveResultPage } from '../../types/resolve-result-page';
import { ResolverContextHeliusInstance } from './types/resolver-context-helius-instance';

export interface ResolveHeliusTokenAccountsParams {
    mint: string;
}

export async function resolveHeliusTokenAccounts({
    handler,
    instance,
    params,
}: {
    handler: (page: ResolveResultPage<DAS.TokenAccounts>) => Promise<boolean> | boolean;
    instance: ResolverContextHeliusInstance;
    params: ResolveHeliusTokenAccountsParams;
}): Promise<ResolveResult> {
    const tag = `resolveHeliusTokenAccounts [${params.mint}]`;
    const result: ResolveResult = {
        errors: [],
        limit: 1000,
        logs: [],
        pages: 0,
        total: 0,
    };

    // Loop through the pages of results
    let page = 1;
    while (result.total < page * result.limit) {
        result.logs.push(`${tag} => Fetching page ${page}...`);
        const assets = await instance.helius.rpc.getTokenAccounts({
            limit: result.limit,
            mint: params.mint,
            page: page,
        });

        if (!assets?.token_accounts?.length) {
            result.logs.push(`${tag} => No ${page > 1 ? 'more' : ''} token accounts found for mint ${params.mint}`);
            break;
        }
        const handled = await handler({ items: assets.token_accounts, page });
        if (!handled) {
            result.errors.push(`${tag} Error handling results for page ${page}`);
        }
        result.pages++;
        result.total += assets.token_accounts.length;
        page++;

        // If we got less than `result.limit` items, we're done
        if (assets.token_accounts.length < result.limit) {
            result.logs.push(`${tag} => No more token accounts found for mint ${params.mint}`);
            break;
        }
    }

    return result;
}
