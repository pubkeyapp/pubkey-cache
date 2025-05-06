import { ResolverConfigHeliusSchema } from './resolver-config-helius-schema';
import { ResolverConfigHelius } from './types/resolver-config-helius';
import { ResolverConfigHeliusInput } from './types/resolver-config-helius-input';

export function validateResolverConfigHelius(input: ResolverConfigHeliusInput): ResolverConfigHelius {
    return ResolverConfigHeliusSchema.parse(input);
}
