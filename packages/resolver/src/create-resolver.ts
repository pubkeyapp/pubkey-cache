import { getResolverId } from './get-resolver-id';
import { Resolver } from './types/resolver';
import { ResolverType } from './types/resolver-type';

export function createResolver(type: ResolverType, address: string): Resolver {
    return { address, id: getResolverId({ address, type }), type };
}
