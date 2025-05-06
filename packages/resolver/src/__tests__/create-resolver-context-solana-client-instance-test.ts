import { createResolverContextSolanaClient } from '../resolvers/solana-client/create-resolver-context-solana-client';
import { createResolverContextSolanaClientInstance } from '../resolvers/solana-client/create-resolver-context-solana-client-instance';
import { type ResolverContextSolanaClient } from '../resolvers/solana-client/types/resolver-context-solana-client';

describe('create-resolver-context-solana-client-instance', () => {
    const endpoint = 'http://localhost:8899';

    describe('expected usage', () => {
        it('should create an instance with minimal config', () => {
            expect.assertions(2);
            // ARRANGE
            const context: ResolverContextSolanaClient = createResolverContextSolanaClient({
                endpoint,
            });
            // ACT
            const instance = createResolverContextSolanaClientInstance(context);
            // ASSERT
            expect(instance.context).toEqual(context);
            expect(Object.keys(instance)).toEqual(['context', 'solanaClient']);
        });
    });
});
