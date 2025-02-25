import { Storage } from 'unstorage';

import { getResolverPathOwner } from './get-resolver-path-owner';
import { getResolverPathSnapshotJson } from './get-resolver-path-snapshot-json';
import { sortResolverResultMap } from './sort-resolver-result-map';
import { ResolverResultMap } from './types/resolver-result-map';

export async function storeResolverResultMap({
    storage,
    path,
    resultMap,
}: {
    path: string;
    resultMap: ResolverResultMap;
    storage: Storage;
}) {
    const pathSnapshot = getResolverPathSnapshotJson(path);
    const pathOwner = getResolverPathOwner(path);

    let writeCount = 0;
    // Store the result in the storage snapshot with an expiration of 1 hour
    await storage.set(pathSnapshot, JSON.stringify(sortResolverResultMap(resultMap)), { ttl: 3600 });
    writeCount++;

    // Now loop over the items and store each of them in the storage owner with an expiration of 1 hour
    for (const item of Object.values(resultMap)) {
        await storage.set(`${pathOwner}:${item.owner}`, JSON.stringify(item), { ttl: 3600 });
        writeCount++;
    }

    return { writeCount };
}
