import { createResolverContextHelius } from '../resolvers/helius/create-resolver-context-helius';
import { ResolverConfigHeliusInput } from '../resolvers/helius/types/resolver-config-helius-input';

describe('create-resolver-context-helius', () => {
    const heliusApiKey = '00000000-0000-0000-0000-000000000000';

    describe('expected usage', () => {
        it('should create a minimal config', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigHeliusInput = { heliusApiKey };
            // ACT
            const resolver = createResolverContextHelius(config);
            // ASSERT
            expect(resolver).toMatchInlineSnapshot(`
                {
                  "clusters": [
                    "SolanaMainnet",
                    "SolanaDevnet",
                  ],
                  "config": {
                    "heliusApiKey": "00000000-0000-0000-0000-000000000000",
                    "heliusCluster": "mainnet-beta",
                    "type": "Helius",
                  },
                  "provides": [
                    "Helius",
                    "SolanaClient",
                  ],
                }
            `);
        });

        it('should create a minimal config with custom cluster', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigHeliusInput = {
                heliusApiKey,
                heliusCluster: 'devnet',
            };
            // ACT
            const resolver = createResolverContextHelius(config);
            // ASSERT
            expect(resolver).toMatchInlineSnapshot(`
                {
                  "clusters": [
                    "SolanaMainnet",
                    "SolanaDevnet",
                  ],
                  "config": {
                    "heliusApiKey": "00000000-0000-0000-0000-000000000000",
                    "heliusCluster": "devnet",
                    "type": "Helius",
                  },
                  "provides": [
                    "Helius",
                    "SolanaClient",
                  ],
                }
            `);
        });
    });

    describe('unexpected usage', () => {
        it('should thrown an error with an invalid api key', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigHeliusInput = { heliusApiKey: '00000000000000000000000000000000' };

            // ASSERT
            expect(() => createResolverContextHelius(config)).toThrowErrorMatchingInlineSnapshot(`
            "[
              {
                "validation": "uuid",
                "code": "invalid_string",
                "message": "Invalid uuid",
                "path": [
                  "heliusApiKey"
                ]
              }
            ]"
        `);
        });

        it('should thrown an error with an invalid cluster', () => {
            expect.assertions(1);
            // ARRANGE
            const config: ResolverConfigHeliusInput = {
                heliusApiKey,
                // @ts-expect-error we are passing in corrupt data
                heliusCluster: 'testnet',
            };

            // ASSERT
            expect(() => createResolverContextHelius(config)).toThrowErrorMatchingInlineSnapshot(`
            "[
              {
                "received": "testnet",
                "code": "invalid_enum_value",
                "options": [
                  "mainnet-beta",
                  "devnet"
                ],
                "path": [
                  "heliusCluster"
                ],
                "message": "Invalid enum value. Expected 'mainnet-beta' | 'devnet', received 'testnet'"
              }
            ]"
        `);
        });
    });
});
