import { Storage } from 'unstorage';

import { getResolverPathSnapshotJson } from './get-resolver-path-snapshot-json';
import { Resolver } from './types/resolver';
import { ResolverResult } from './types/resolver-result';

export async function getResolverSnapshot({
    resolver,
    storage,
}: {
    resolver: Resolver;
    storage: Storage;
}): Promise<ResolverResult[] | null> {
    return await storage.get<ResolverResult[]>(getResolverPathSnapshotJson(resolver.id));
}
