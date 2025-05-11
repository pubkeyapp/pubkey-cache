import { ResolverConfigType } from '../../types/resolver-config-type';
import { getRealms } from './helper/get-realms';
import { ResolverContextRealms } from './types/resolver-context-realms';
import { ResolverContextRealmsInstance } from './types/resolver-context-realms-instance';

export function createResolverContextRealmsInstance(context: ResolverContextRealms): ResolverContextRealmsInstance {
    if (!context.provides.includes(ResolverConfigType.Realms)) {
        throw new Error(`Context does not provide ResolverConfigType ${ResolverConfigType.Realms}`);
    }
    return {
        context,
        realms: getRealms(context.config),
    };
}
