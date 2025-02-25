import { Storage } from 'unstorage';

import { getResolverPathOwner } from './get-resolver-path-owner';
import { Resolver } from './types/resolver';
import { ResolverResultMap } from './types/resolver-result-map';

export async function getResolverOwner({
    owner,
    resolver,
    storage,
}: {
    owner: string;
    resolver: Resolver;
    storage: Storage;
}): Promise<ResolverResultMap | null> {
    return await storage.get<ResolverResultMap>(getResolverPathOwner(resolver.id, owner.toString()));
}
