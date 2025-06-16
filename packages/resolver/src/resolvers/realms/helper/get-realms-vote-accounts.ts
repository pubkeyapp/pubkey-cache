import { getGovernanceAccounts, pubkeyFilter, TokenOwnerRecord } from '@solana/spl-governance';
import { Connection, PublicKey } from '@solana/web3.js';

import { ResolverConfigRealms } from '../types/resolver-config-realms';

export interface RealmsVoteAccountsParams {
    config: ResolverConfigRealms;
    realm: string;
    tokenMint: string;
}

export interface RealmsVoteAccount {
    realm: string;
    tokenMint: string;
    voteAccount: string;
    voteAmount: string;
    voteTotal: string;
}

export async function getRealmsVoteAccounts({
    config,
    realm,
    tokenMint,
}: RealmsVoteAccountsParams): Promise<RealmsVoteAccount[]> {
    const connection = new Connection(config.endpoint, 'confirmed');
    //

    const filter1 = pubkeyFilter(1, new PublicKey(realm));
    const filter2 = pubkeyFilter(1 + 32, new PublicKey(tokenMint));

    if (!(filter1 && filter2)) {
        throw new Error('Unable to create filters to getGovernanceAccounts');
    }

    const accounts = await getGovernanceAccounts(connection, new PublicKey(config.programId), TokenOwnerRecord, [
        filter1,
        filter2,
    ]);
    return accounts
        .filter(({ account }) => account.governingTokenDepositAmount.gtn(0))
        .map(({ account }) => {
            return {
                realm,
                tokenMint,
                voteAccount: account.governingTokenOwner.toString(),
                voteAmount: account.governingTokenDepositAmount.toString(),
                voteTotal: account.totalVotesCount.toString(),
            };
        });
}
