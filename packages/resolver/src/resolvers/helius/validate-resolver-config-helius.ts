import * as v from 'valibot';

import { getResolverConfigHeliusSchema } from './get-resolver-config-helius-schema';
import { ResolverConfigHelius } from './types/resolver-config-helius';
import { ResolverConfigHeliusInput } from './types/resolver-config-helius-input';

export function validateResolverConfigHelius(input: ResolverConfigHeliusInput): ResolverConfigHelius {
    return v.parse(getResolverConfigHeliusSchema(), input);
}
