import { ResolverConfigRealms } from '../types/resolver-config-realms';

export function getRealms({ cluster, realms, type }: ResolverConfigRealms) {
    return {
        cluster,
        realms,
        type,
    };
}

export type Realms = ReturnType<typeof getRealms>;
