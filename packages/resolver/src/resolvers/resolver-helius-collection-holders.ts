import { ResolverResultAsset } from '../types/resolver-result';
import { ResolverResultMap } from '../types/resolver-result-map';
import {
    resolverHeliusCollectionAssets,
    ResolverHeliusCollectionAssetsOptions,
} from './resolver-helius-collection-assets';

export async function resolverHeliusCollectionHolders(
    options: ResolverHeliusCollectionAssetsOptions,
): Promise<ResolverResultMap> {
    const assets = await resolverHeliusCollectionAssets(options);

    const result: ResolverResultMap = {};

    for (const asset of assets.items) {
        if (asset.ownership.owner in result) {
            result[asset.ownership.owner].amount += 1;
            result[asset.ownership.owner].addresses.push(asset.id);
            result[asset.ownership.owner].assets.push(asset as unknown as ResolverResultAsset);
            if (options.verbose) {
                console.log(
                    `   => resolverHeliusNftHolders [${options.collection}] => Owner ${asset.ownership.owner} has multiple addresses, adding ${asset.id}`,
                );
            }
            continue;
        }
        result[asset.ownership.owner] = {
            addresses: [asset.id],
            amount: 1,
            assets: [asset as unknown as ResolverResultAsset],
            owner: asset.ownership.owner,
        };
    }
    for (const owner in result) {
        result[owner].assets = result[owner].assets.sort((a, b) => {
            const aName = a.content?.metadata?.name ?? '';
            const bName = b.content?.metadata?.name ?? '';
            if (aName < bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        });
    }

    return result;
}
