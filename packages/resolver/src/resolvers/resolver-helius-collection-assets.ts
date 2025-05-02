import { DAS, Helius } from 'helius-sdk';

export interface ResolverHeliusCollectionAssetsOptions {
    collection: string;
    helius: Helius;
    verbose?: boolean;
}

export interface HeliusCollectionAssets {
    items: DAS.GetAssetResponse[];
    limit: number;
    page: number;
    total: number;
}

/**
 * Get all assets by collection
 * @param options HeliusGetNftCollectionOptions
 */
export async function resolverHeliusCollectionAssets(
    options: ResolverHeliusCollectionAssetsOptions,
): Promise<HeliusCollectionAssets> {
    let page = 1;
    // Create a response list similar to the one returned by the API
    const list: HeliusCollectionAssets = { items: [], limit: 1000, page, total: 0 };

    // Loop through all pages of assets
    while (list.total < page * list.limit) {
        if (options.verbose) {
            console.log(`   => heliusGetNftCollection [${options.collection}] => Fetching page ${page}...`);
        }
        const assets = await options.helius.rpc.getAssetsByGroup({
            groupKey: 'collection',
            groupValue: options.collection,
            limit: list.limit,
            page: page,
        });
        if (assets.items.length === 0) {
            if (options.verbose) {
                console.log(
                    `   => heliusGetNftCollection [${options.collection}] => No ${page > 1 ? 'more' : ''} assets found for collection ${options.collection}`,
                );
            }
            break;
        }
        list.items.push(...assets.items);
        list.total += assets.total;
        page++;

        // If we got less than `list.limit` items, we're done
        if (assets.items.length < list.limit) {
            if (options.verbose) {
                console.log(
                    `   => heliusGetNftCollection [${options.collection}] => No more assets found for collection ${options.collection}`,
                );
            }
            break;
        }
    }

    // Filter the assets by owner
    const items = list.items?.length ? list?.items : [];

    // Return the list with the page offset by 1
    return { ...list, items, page: page - 1 };
}
