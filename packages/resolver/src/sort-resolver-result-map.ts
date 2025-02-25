import { ResolverResult } from './types/resolver-result';
import { ResolverResultMap } from './types/resolver-result-map';

export function sortResolverResultMap(result: ResolverResultMap): ResolverResult[] {
    return (
        Object.values(result)
            // Sort by owner address
            .sort((a, b) => a.owner.localeCompare(b.owner))
            // Sort by amount
            .sort((a, b) => b.amount - a.amount)
    );
}
