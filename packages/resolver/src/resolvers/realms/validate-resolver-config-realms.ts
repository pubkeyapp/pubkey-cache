import * as v from 'valibot';

import { getResolverConfigRealmsSchema } from './get-resolver-config-realms-schema';
import { ResolverConfigRealms } from './types/resolver-config-realms';
import { ResolverConfigRealmsInput } from './types/resolver-config-realms-input';

export function validateResolverConfigRealms(input: ResolverConfigRealmsInput): ResolverConfigRealms {
    return v.parse(getResolverConfigRealmsSchema(), {
        ...input,
    });
}
