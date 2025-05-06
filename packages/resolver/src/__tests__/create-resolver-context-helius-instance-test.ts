import { Helius } from 'helius-sdk';

import { createResolverContextHelius } from '../resolvers/helius/create-resolver-context-helius';
import { createResolverContextHeliusInstance } from '../resolvers/helius/create-resolver-context-helius-instance';
import { ResolverContextHelius } from '../resolvers/helius/types/resolver-context-helius';

describe('create-resolver-context-helius-instance', () => {
    const heliusApiKey = '00000000-0000-0000-0000-000000000000';

    describe('expected usage', () => {
        it('should create an instance with minimal config', () => {
            expect.assertions(3);
            // ARRANGE
            const context: ResolverContextHelius = createResolverContextHelius({
                heliusApiKey,
            });
            // ACT
            const instance = createResolverContextHeliusInstance(context);
            // ASSERT
            expect(instance.context).toEqual(context);
            expect(instance.helius).toBeInstanceOf(Helius);
            expect(Object.keys(instance)).toEqual(['context', 'helius', 'solanaClient']);
        });
    });
});
