import { createResolverContextRealms } from '../resolvers/realms/create-resolver-context-realms';
import { ResolverConfigRealmsInput } from '../resolvers/realms/types/resolver-config-realms-input';

describe('create-resolver-context-realms', () => {
    const tokenMint = 'Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a';
    const programId = 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw';
    const realm = 'F9V4Lwo49aUe8fFujMbU6uhdFyDRqKY54WpzdpncUSk9';

    describe('expected usage', () => {
        it('should create a minimal config', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigRealmsInput = { programId, realm, tokenMint };
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
                    "realm": "F9V4Lwo49aUe8fFujMbU6uhdFyDRqKY54WpzdpncUSk9",
                    "tokenMint": "Ds52CDgqdWbTWsua1hgT3AuSSy4FNx2Ezge1br3jQ14a",
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
