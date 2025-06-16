import { createResolverContextRealms } from '../resolvers/realms/create-resolver-context-realms';
import { createResolverContextRealmsInstance } from '../resolvers/realms/create-resolver-context-realms-instance';
import { ResolverContextRealms } from '../resolvers/realms/types/resolver-context-realms';

describe('create-resolver-context-realms-instance', () => {
    const endpoint = 'https://api.mainnet-beta.solana.com';

    describe('expected usage', () => {
        it('should create an instance with minimal config', () => {
            expect.assertions(2);
            // ARRANGE
            const context: ResolverContextRealms = createResolverContextRealms({
                endpoint,
            });
            // ACT
            const instance = createResolverContextRealmsInstance(context);
            // ASSERT
            expect(instance.context).toEqual(context);

            expect(Object.keys(instance)).toEqual(['context', 'realms']);
        });
    });
});
