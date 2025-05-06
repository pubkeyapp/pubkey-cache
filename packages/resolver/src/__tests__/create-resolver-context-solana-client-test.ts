import { createResolverContextSolanaClient } from '../resolvers/solana-client/create-resolver-context-solana-client';
import { ResolverConfigSolanaClientInput } from '../resolvers/solana-client/types/resolver-config-solana-client-input';

describe('create-resolver-context-solana-client', () => {
    const endpoint = 'https://api.mainnet-beta.solana.com';

    describe('expected usage', () => {
        it('should create a minimal context', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigSolanaClientInput = { endpoint };
            // ACT
            const context = createResolverContextSolanaClient(config);
            // ASSERT
            expect(context).toMatchInlineSnapshot(`
                {
                  "clusters": [
                    "SolanaCustom",
                    "SolanaDevnet",
                    "SolanaMainnet",
                    "SolanaTestnet",
                  ],
                  "config": {
                    "cluster": "mainnet",
                    "endpoint": "https://api.mainnet-beta.solana.com",
                    "endpointWs": "wss://api.mainnet-beta.solana.com",
                    "type": "SolanaClient",
                  },
                  "provides": [
                    "SolanaClient",
                  ],
                }
            `);
        });

        it('should create a minimal context with custom cluster', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigSolanaClientInput = { cluster: 'localnet', endpoint: 'http://localhost:8899' };
            // ACT
            const context = createResolverContextSolanaClient(config);
            // ASSERT
            expect(context).toMatchInlineSnapshot(`
                {
                  "clusters": [
                    "SolanaCustom",
                    "SolanaDevnet",
                    "SolanaMainnet",
                    "SolanaTestnet",
                  ],
                  "config": {
                    "cluster": "localnet",
                    "endpoint": "http://localhost:8899",
                    "endpointWs": "ws://localhost:8899",
                    "type": "SolanaClient",
                  },
                  "provides": [
                    "SolanaClient",
                  ],
                }
            `);
        });
    });

    describe('unexpected usage', () => {
        it('should thrown an error with an invalid endpoint', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigSolanaClientInput = { endpoint: 'this is not a url' };

            // ASSERT
            expect(() => createResolverContextSolanaClient(config)).toThrowErrorMatchingInlineSnapshot(
                `"Invalid URL: Received "this is not a url""`,
            );
        });
        it('should thrown an error with an invalid endpointWs', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigSolanaClientInput = { endpoint, endpointWs: 'not a ws endpoint' };

            // ASSERT
            expect(() => createResolverContextSolanaClient(config)).toThrowErrorMatchingInlineSnapshot(
                `"Invalid URL: Received "not a ws endpoint""`,
            );
        });

        it('should thrown an error with an invalid cluster', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigSolanaClientInput = {
                // @ts-expect-error we are passing in corrupt data
                cluster: 'random',
                endpoint,
            };

            // ASSERT
            expect(() => createResolverContextSolanaClient(config)).toThrowErrorMatchingInlineSnapshot(
                `"Invalid type: Expected ("mainnet" | "devnet" | "testnet" | "localnet") but received "random""`,
            );
        });
    });
});
