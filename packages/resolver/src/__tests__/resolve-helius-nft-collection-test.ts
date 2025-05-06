import { DAS } from 'helius-sdk';

import { createMockHeliusInstance } from '../__setup__/create-mock-helius-instance';
import {
    resolveHeliusCollectionAssets,
    ResolveHeliusCollectionAssetsParams,
} from '../resolvers/helius/resolve-helius-collection-assets';
import { ResolveResult } from '../types/resolve-result';

describe('resolve-helius-collection-assets', () => {
    // Test case 1: Multiple pages (1500 items total)
    it('fetches all assets across multiple pages', async () => {
        expect.assertions(9);
        // Arrange: Prepare mock data and behavior
        const collection = 'test-collection';
        const limit = 1000;

        // Mock items for page 1 (1000 items) and page 2 (500 items)
        const mockItemsPage1 = Array.from({ length: 1000 }, (_, i) => ({ id: `asset${i}` }));
        const mockItemsPage2 = Array.from({ length: 500 }, (_, i) => ({ id: `asset${1000 + i}` }));
        const mockResponsePage1 = { items: mockItemsPage1, total: 1000 };
        const mockResponsePage2 = { items: mockItemsPage2, total: 500 };

        // Mock getAssetsByGroup to return different responses based on page
        const mockGetAssetsByGroup = jest.fn().mockImplementation(options => {
            // eslint-disable-next-line jest/no-conditional-in-test
            if (options.page === 1) return Promise.resolve(mockResponsePage1);
            // eslint-disable-next-line jest/no-conditional-in-test
            if (options.page === 2) return Promise.resolve(mockResponsePage2);
            return Promise.resolve({ items: [], total: 0 });
        });

        const items: DAS.GetAssetResponse[] = [];

        // Act: Call the function
        const result: ResolveResult = await resolveHeliusCollectionAssets({
            handler: page => {
                items.push(...page.items);
                return true;
            },
            instance: createMockHeliusInstance({ rpc: { getAssetsByGroup: mockGetAssetsByGroup } }),
            params: { collection },
        });

        // Assert: Verify the results
        expect(items).toHaveLength(1500); // 1000 + 500 items
        expect(result.limit).toBe(limit);
        expect(result.pages).toBe(2); // Last page fetched was 2 (returned as page - 1)
        expect(result.total).toBe(1500); // Accumulated total from mock responses
        expect(result.errors).toMatchInlineSnapshot(`[]`);
        expect(result.logs).toMatchInlineSnapshot(`
            [
              "resolveHeliusCollectionAssets [test-collection] => Fetching page 1...",
              "resolveHeliusCollectionAssets [test-collection] => Fetching page 2...",
              "resolveHeliusCollectionAssets [test-collection] => No more assets found for collection test-collection",
            ]
        `);

        // Verify mock calls
        expect(mockGetAssetsByGroup).toHaveBeenCalledTimes(2);
        expect(mockGetAssetsByGroup).toHaveBeenCalledWith({
            groupKey: 'collection',
            groupValue: collection,
            limit,
            page: 1,
        });
        expect(mockGetAssetsByGroup).toHaveBeenCalledWith({
            groupKey: 'collection',
            groupValue: collection,
            limit,
            page: 2,
        });
    });

    // Test case 2: No assets
    it('handles a collection with no assets', async () => {
        expect.assertions(6);
        const collection = 'empty-collection';
        const limit = 1000;
        const mockResponse = { items: [], total: 0 };
        const mockGetAssetsByGroup = jest.fn().mockResolvedValue(mockResponse);
        const items: DAS.GetAssetResponse[] = [];

        const result: ResolveResult = await resolveHeliusCollectionAssets({
            handler: page => {
                items.push(...page.items);
                return true;
            },
            instance: createMockHeliusInstance({ rpc: { getAssetsByGroup: mockGetAssetsByGroup } }),
            params: { collection },
        });

        expect(items).toHaveLength(0);
        expect(result.limit).toBe(limit);
        expect(result.pages).toBe(0); // Page 1 - 1, since no items were fetched
        expect(result.total).toBe(0);

        expect(mockGetAssetsByGroup).toHaveBeenCalledTimes(1);
        expect(mockGetAssetsByGroup).toHaveBeenCalledWith({
            groupKey: 'collection',
            groupValue: collection,
            limit,
            page: 1,
        });
    });

    // Test case 3: Exactly one page (less than limit)
    it('handles a single page with fewer items than the limit', async () => {
        expect.assertions(6);
        const collection = 'small-collection';
        const limit = 1000;
        const mockItems = Array.from({ length: 800 }, (_, i) => ({ id: `asset${i}` }));
        const mockResponse = { items: mockItems, total: 800 };
        const mockGetAssetsByGroup = jest.fn().mockResolvedValue(mockResponse);
        const items: DAS.GetAssetResponse[] = [];
        const params: ResolveHeliusCollectionAssetsParams = { collection };

        const result: ResolveResult = await resolveHeliusCollectionAssets({
            handler: page => {
                items.push(...page.items);
                return true;
            },
            instance: createMockHeliusInstance({ rpc: { getAssetsByGroup: mockGetAssetsByGroup } }),
            params,
        });

        expect(items).toHaveLength(800);
        expect(result.limit).toBe(limit);
        expect(result.pages).toBe(1); // Only fetched page 1
        expect(result.total).toBe(800);

        expect(mockGetAssetsByGroup).toHaveBeenCalledTimes(1);
        expect(mockGetAssetsByGroup).toHaveBeenCalledWith({
            groupKey: 'collection',
            groupValue: collection,
            limit,
            page: 1,
        });
    });

    // Test case 4: Exactly the limit (1000 items)
    it('handles a collection with exactly the limit number of items', async () => {
        expect.assertions(7);
        const collection = 'exact-limit-collection';
        const limit = 1000;
        const mockItems = Array.from({ length: 1000 }, (_, i) => ({ id: `asset${i}` }));
        const mockResponsePage1 = { items: mockItems, total: 1000 };
        const mockResponsePage2 = { items: [], total: 0 };

        const mockGetAssetsByGroup = jest.fn().mockImplementation(options => {
            // eslint-disable-next-line jest/no-conditional-in-test
            if (options.page === 1) return Promise.resolve(mockResponsePage1);
            return Promise.resolve(mockResponsePage2);
        });

        const items: DAS.GetAssetResponse[] = [];
        const params: ResolveHeliusCollectionAssetsParams = { collection };

        const result: ResolveResult = await resolveHeliusCollectionAssets({
            handler: page => {
                items.push(...page.items);
                return true;
            },
            instance: createMockHeliusInstance({ rpc: { getAssetsByGroup: mockGetAssetsByGroup } }),
            params,
        });

        expect(items).toHaveLength(1000);
        expect(result.limit).toBe(limit);
        expect(result.pages).toBe(1); // Fetched page 2 and got 0 items
        expect(result.total).toBe(1000);

        expect(mockGetAssetsByGroup).toHaveBeenCalledTimes(2);
        expect(mockGetAssetsByGroup).toHaveBeenCalledWith({
            groupKey: 'collection',
            groupValue: collection,
            limit,
            page: 1,
        });
        expect(mockGetAssetsByGroup).toHaveBeenCalledWith({
            groupKey: 'collection',
            groupValue: collection,
            limit,
            page: 2,
        });
    });
});
