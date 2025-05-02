import { DAS, Helius } from 'helius-sdk';

export interface HeliusGetTokenAccountsOptions {
    helius: Helius;
    mint: string;
    verbose?: boolean;
}

export interface HeliusTokenAccounts {
    items: DAS.TokenAccounts[];
    limit: number;
    page: number;
    total: number;
}

/**
 * Get token holders
 * @param options HeliusGetTokenAccountsOptions
 */
export async function resolverHeliusTokenAccounts(
    options: HeliusGetTokenAccountsOptions,
): Promise<HeliusTokenAccounts> {
    let page = 1;
    // Create a response list similar to the one returned by the API
    const list: HeliusTokenAccounts = {
        items: [],
        limit: 1000,
        page,
        total: 0,
    };

    // Loop through all pages of assets
    while (list.total < page * list.limit) {
        if (options.verbose) {
            console.log(`   => heliusGetTokenAccounts [${options.mint}] => Fetching page ${page}...`);
        }
        const assets = await options.helius.rpc.getTokenAccounts({ limit: list.limit, mint: options.mint, page: page });

        if (!assets?.token_accounts?.length) {
            if (options.verbose) {
                console.log(
                    `   => heliusGetTokenAccounts [${options.mint}] => No ${page > 1 ? 'more' : ''} token accounts found for mint ${options.mint}`,
                );
            }
            break;
        }

        if (assets?.token_accounts?.length === 0) {
            break;
        }
        list.items.push(...assets.token_accounts);
        list.total += assets.total ?? 0;
        page++;

        // If we got less than `list.limit` items, we're done
        if (assets.token_accounts.length < list.limit) {
            if (options.verbose) {
                console.log(
                    `   => heliusGetTokenAccounts [${options.mint}] => No more token accounts found for mint ${options.mint}`,
                );
            }
            break;
        }
    }

    // Filter the assets by owner
    const items = list.items?.length ? list?.items : [];

    // Return the list with the page offset by 1
    return { ...list, items, page: page - 1 };
}
