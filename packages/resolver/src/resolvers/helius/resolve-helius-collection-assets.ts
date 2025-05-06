import { DAS } from 'helius-sdk';

import { ResolveResult } from '../../types/resolve-result';
import { ResolveResultPage } from '../../types/resolve-result-page';
import { ResolverContextHeliusInstance } from './types/resolver-context-helius-instance';

export interface ResolveHeliusCollectionAssetsParams {
    collection: string;
}

export async function resolveHeliusCollectionAssets({
    handler,
    instance,
    params,
}: {
    handler: (page: ResolveResultPage<DAS.GetAssetResponse>) => Promise<boolean> | boolean;
    instance: ResolverContextHeliusInstance;
    params: ResolveHeliusCollectionAssetsParams;
}): Promise<ResolveResult> {
    const tag = `resolveHeliusCollectionAssets [${params.collection}]`;
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
        const assets = await instance.helius.rpc.getAssetsByGroup({
            groupKey: 'collection',
            groupValue: params.collection,
            limit: result.limit,
            page: page,
        });
        if (assets.items.length === 0) {
            result.logs.push(`${tag} => No ${page > 1 ? 'more' : ''} assets found for collection ${params.collection}`);
            break;
        }
        const handled = await handler({ items: assets.items, page });
        if (!handled) {
            result.errors.push(`${tag} Error handling results for page ${page}`);
        }
        result.pages++;
        result.total += assets.total;
        page++;

        // If we got less than `list.limit` items, we're done
        if (assets.items.length < result.limit) {
            result.logs.push(`${tag} => No more assets found for collection ${params.collection}`);
            break;
        }
    }

    return result;
}
