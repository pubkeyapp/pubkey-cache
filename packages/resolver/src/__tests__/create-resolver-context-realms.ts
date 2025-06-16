import { createResolverContextRealms } from '../resolvers/realms/create-resolver-context-realms';
import { ResolverConfigRealmsInput } from '../resolvers/realms/types/resolver-config-realms-input';

describe('create-resolver-context-realms', () => {
    const endpoint = 'https://api.mainnet-beta.solana.com';
    const programId = 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw';

    describe('expected usage', () => {
        it('should create a minimal config', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigRealmsInput = { endpoint, programId };
            // ACT
            const resolver = createResolverContextRealms(config);
            // ASSERT
            expect(resolver).toMatchInlineSnapshot(`
                {
                  "clusters": [
                    "SolanaDevnet",
                    "SolanaMainnet",
                  ],
                  "config": {
                    "endpoint": "https://api.mainnet-beta.solana.com",
                    "programId": "GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw",
                    "type": "Realms",
                  },
                  "provides": [
                    "Realms",
                  ],
                }
            `);
        });
    });

    // describe('unexpected usage', () => {
    //
    //
    //
    // });
});
