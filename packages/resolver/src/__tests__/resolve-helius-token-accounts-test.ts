import { DAS } from 'helius-sdk';

import { createMockHeliusInstance } from '../__setup__/create-mock-helius-instance'; // Adjust path as needed
import { resolveHeliusTokenAccounts } from '../resolvers/helius/resolve-helius-token-accounts';
import { ResolveResult } from '../types/resolve-result';

describe('resolve-helius-token-accounts', () => {
    // Test case 1: Multiple pages (1500 token accounts total)
    it('fetches all token accounts across multiple pages', async () => {
        expect.assertions(9);
        // Arrange: Prepare mock data and behavior
        const mint = 'test-mint';
        const limit = 1000;

        // Mock token accounts for page 1 (1000 items) and page 2 (500 items)
        const mockAccountsPage1 = Array.from({ length: 1000 }, (_, i) => ({ id: `account${i}` }));
        const mockAccountsPage2 = Array.from({ length: 500 }, (_, i) => ({ id: `account${1000 + i}` }));
        const mockResponsePage1 = { token_accounts: mockAccountsPage1, total: 1000 };
        const mockResponsePage2 = { token_accounts: mockAccountsPage2, total: 500 };

        // Mock getTokenAccounts to return different responses based on page
        const mockGetTokenAccounts = jest.fn().mockImplementation(options => {
            // eslint-disable-next-line jest/no-conditional-in-test
            if (options.page === 1) return Promise.resolve(mockResponsePage1);
            // eslint-disable-next-line jest/no-conditional-in-test
            if (options.page === 2) return Promise.resolve(mockResponsePage2);
            return Promise.resolve({ token_accounts: [], total: 0 });
        });

        const items: DAS.TokenAccounts[] = [];

        // Act: Call the function
        const result: ResolveResult = await resolveHeliusTokenAccounts({
            handler: page => {
                items.push(...page.items);
                return true;
            },
            instance: createMockHeliusInstance({ rpc: { getTokenAccounts: mockGetTokenAccounts } }),
            params: { mint },
        });

        // Assert: Verify the results
        expect(items).toHaveLength(1500); // 1000 + 500 token accounts
        expect(result.limit).toBe(limit);
        expect(result.pages).toBe(2); // Last page fetched was 2 (returned as page - 1)
        expect(result.total).toBe(1500); // Accumulated total from mock responses
        expect(result.errors).toMatchInlineSnapshot(`[]`);
        expect(result.logs).toMatchInlineSnapshot(`
            [
              "resolveHeliusTokenAccounts [test-mint] => Fetching page 1...",
              "resolveHeliusTokenAccounts [test-mint] => Fetching page 2...",
              "resolveHeliusTokenAccounts [test-mint] => No more token accounts found for mint test-mint",
            ]
        `);

        // Verify mock calls
        expect(mockGetTokenAccounts).toHaveBeenCalledTimes(2);
        expect(mockGetTokenAccounts).toHaveBeenCalledWith({
            limit,
            mint,
            page: 1,
        });
        expect(mockGetTokenAccounts).toHaveBeenCalledWith({
            limit,
            mint,
            page: 2,
        });
    });

    // Test case 2: No token accounts
    it('handles a mint with no token accounts', async () => {
        expect.assertions(6);
        const mint = 'empty-mint';
        const limit = 1000;
        const mockResponse = { token_accounts: [], total: 0 };

        const mockGetTokenAccounts = jest.fn().mockResolvedValue(mockResponse);

        const items: DAS.TokenAccounts[] = [];
        const result: ResolveResult = await resolveHeliusTokenAccounts({
            handler: page => {
                items.push(...page.items);
                return true;
            },
            instance: createMockHeliusInstance({ rpc: { getTokenAccounts: mockGetTokenAccounts } }),
            params: { mint },
        });

        expect(items).toHaveLength(0);
        expect(result.limit).toBe(limit);
        expect(result.pages).toBe(0); // Page 1 - 1, since no items were fetched
        expect(result.total).toBe(0);

        expect(mockGetTokenAccounts).toHaveBeenCalledTimes(1);
        expect(mockGetTokenAccounts).toHaveBeenCalledWith({
            limit,
            mint,
            page: 1,
        });
    });

    // Test case 3: Exactly one page (less than limit)
    it('handles a single page with fewer token accounts than the limit', async () => {
        expect.assertions(6);
        const mint = 'small-mint';
        const limit = 1000;
        const mockAccounts = Array.from({ length: 800 }, (_, i) => ({ id: `account${i}` }));
        const mockResponse = { token_accounts: mockAccounts, total: 800 };

        const mockGetTokenAccounts = jest.fn().mockResolvedValue(mockResponse);

        const items: DAS.TokenAccounts[] = [];
        const result: ResolveResult = await resolveHeliusTokenAccounts({
            handler: page => {
                items.push(...page.items);
                return true;
            },
            instance: createMockHeliusInstance({ rpc: { getTokenAccounts: mockGetTokenAccounts } }),
            params: { mint },
        });

        expect(items).toHaveLength(800);
        expect(result.limit).toBe(limit);
        expect(result.pages).toBe(1); // Only fetched page 1
        expect(result.total).toBe(800);

        expect(mockGetTokenAccounts).toHaveBeenCalledTimes(1);
        expect(mockGetTokenAccounts).toHaveBeenCalledWith({
            limit,
            mint,
            page: 1,
        });
    });

    // Test case 4: Exactly the limit (1000 token accounts)
    it('handles a mint with exactly the limit number of token accounts', async () => {
        expect.assertions(7);
        const mint = 'exact-limit-mint';
        const limit = 1000;
        const mockAccounts = Array.from({ length: 1000 }, (_, i) => ({ id: `account${i}` }));
        const mockResponsePage1 = { token_accounts: mockAccounts, total: 1000 };
        const mockResponsePage2 = { token_accounts: [], total: 0 };

        const mockGetTokenAccounts = jest.fn().mockImplementation(options => {
            // eslint-disable-next-line jest/no-conditional-in-test
            if (options.page === 1) return Promise.resolve(mockResponsePage1);
            return Promise.resolve(mockResponsePage2);
        });
        const items: DAS.TokenAccounts[] = [];
        const result: ResolveResult = await resolveHeliusTokenAccounts({
            handler: page => {
                items.push(...page.items);
                return true;
            },
            instance: createMockHeliusInstance({ rpc: { getTokenAccounts: mockGetTokenAccounts } }),
            params: { mint },
        });

        expect(items).toHaveLength(1000);
        expect(result.limit).toBe(limit);
        expect(result.pages).toBe(1); // Fetched page 2 and got 0 items
        expect(result.total).toBe(1000);

        expect(mockGetTokenAccounts).toHaveBeenCalledTimes(2);
        expect(mockGetTokenAccounts).toHaveBeenCalledWith({
            limit,
            mint,
            page: 1,
        });
        expect(mockGetTokenAccounts).toHaveBeenCalledWith({
            limit,
            mint,
            page: 2,
        });
    });
});
