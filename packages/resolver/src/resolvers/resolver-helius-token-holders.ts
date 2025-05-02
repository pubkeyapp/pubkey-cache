import { ResolverResultAsset } from '../types/resolver-result';
import { ResolverResultMap } from '../types/resolver-result-map';
import { HeliusGetTokenAccountsOptions, resolverHeliusTokenAccounts } from './resolver-helius-token-accounts';

export async function resolverHeliusTokenHolders(options: HeliusGetTokenAccountsOptions): Promise<ResolverResultMap> {
    const assets = await resolverHeliusTokenAccounts(options);

    const holderMap: ResolverResultMap = {};
    for (const asset of assets.items) {
        if (!asset.owner || !asset.address) {
            continue;
        }
        const amount = Number(asset.amount ?? '0');
        if (asset.owner in holderMap) {
            holderMap[asset.owner].amount += amount;
            holderMap[asset.owner].addresses.push(asset.address);
            holderMap[asset.owner].assets.push(asset as unknown as ResolverResultAsset);
            if (options.verbose) {
                console.log(
                    `   => resolverHeliusTokenHolders [${options.mint}] => Owner ${asset.owner} has multiple addresses, adding ${asset.address}`,
                );
            }
            continue;
        }
        holderMap[asset.owner] = {
            addresses: [asset.address],
            amount,
            assets: [asset as unknown as ResolverResultAsset],
            owner: asset.owner,
        };
    }

    return holderMap;
}
