import { ResolverResultMap } from '../types/resolver-result-map';
import { heliusGetNftHolders, HeliusGetNftHoldersOptions } from './helius/helius-get-nft-holders';

export async function resolverHeliusNftHolders(options: HeliusGetNftHoldersOptions): Promise<ResolverResultMap> {
    const assets = await heliusGetNftHolders(options);

    const result: ResolverResultMap = {};

    for (const asset of assets.items) {
        if (asset.ownership.owner in result) {
            result[asset.ownership.owner].amount += 1;
            result[asset.ownership.owner].addresses.push(asset.id);
            if (options.verbose) {
                console.log(
                    `   => resolverHeliusNftHolders [${options.collection}] => Owner ${asset.ownership.owner} has multiple addresses, adding ${asset.id}`,
                );
            }
            continue;
        }
        result[asset.ownership.owner] = { addresses: [asset.id], amount: 1, owner: asset.ownership.owner };
    }

    return result;
}
