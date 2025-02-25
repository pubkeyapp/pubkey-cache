import { createResolver } from './create-resolver';
import { Resolver } from './types/resolver';
import { ResolverType } from './types/resolver-type';

export function parseResolverString(resolverString: string | undefined): Resolver[] {
    if (!resolverString) {
        return [];
    }

    const resolvers: Resolver[] = [];
    const validResolverTypes = Object.values(ResolverType);

    // Split the string by '|' to separate different resolver groups
    const resolverGroups = resolverString.split('|');

    for (const group of resolverGroups) {
        const [prefix, addresses] = group.split(':');

        // Check if the prefix is a valid ResolverType
        if (!validResolverTypes.includes(prefix as ResolverType)) {
            throw new Error(`Invalid resolver type: ${prefix}`);
        }

        // Split addresses and create Resolver objects
        const addressList = addresses.split(',');
        for (const address of addressList) {
            // Basic address validation (you might want to add more specific checks)
            if (!address.trim()) {
                throw new Error('Empty address found in resolver string');
            }

            resolvers.push(createResolver(prefix as ResolverType, address.trim()));
        }
    }

    return resolvers;
}
