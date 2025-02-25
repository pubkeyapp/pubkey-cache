import { ResolverResultMap } from '../types/resolver-result-map';
import { heliusGetTokenHolders, HeliusGetTokenHoldersOptions } from './helius/helius-get-token-holders';

export async function resolverHeliusTokenHolders(options: HeliusGetTokenHoldersOptions): Promise<ResolverResultMap> {
    const assets = await heliusGetTokenHolders(options);

    const holderMap: ResolverResultMap = {};
    for (const asset of assets.items) {
        if (!asset.owner || !asset.address) {
            continue;
        }
        const amount = Number(asset.amount ?? '0');
        if (asset.owner in holderMap) {
            holderMap[asset.owner].amount += amount;
            holderMap[asset.owner].addresses.push(asset.address);
            if (options.verbose) {
                console.log(
                    `   => resolverHeliusTokenHolders [${options.mint}] => Owner ${asset.owner} has multiple addresses, adding ${asset.address}`,
                );
            }
            continue;
        }
        holderMap[asset.owner] = { addresses: [asset.address], amount, owner: asset.owner };
    }

    return holderMap;
}
