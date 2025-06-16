import { BN } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';

import { ResolverConfigRealms } from '../types/resolver-config-realms';
import { getRealmsVoteAccounts, RealmsVoteAccountsParams } from './get-realms-vote-accounts';

export function getRealms(config: ResolverConfigRealms) {
    return {
        getRealmsVoteAccounts: async ({ realm, tokenMint }: Omit<RealmsVoteAccountsParams, 'config'>) => {
            return await getRealmsVoteAccounts({ config, realm, tokenMint });
        },
        type: config.type,
    };
}

export type Realms = ReturnType<typeof getRealms>;

export const VOTER_INFO_EVENT_NAME = 'VoterInfo';

export interface Voter {
    deposits: Deposit[];
    registrar: PublicKey;
    voterAuthority: PublicKey;
    //there are more fields but no use for them on ui yet
}

interface VotingMint {
    baselineVoteWeightScaledFactor: BN;
    digitShift: number;
    grantAuthority: PublicKey;
    lockupSaturationSecs: BN;
    maxExtraLockupVoteWeightScaledFactor: BN;
    mint: PublicKey;
}

export type LockupType = 'cliff' | 'constant' | 'daily' | 'monthly' | 'none';

export interface Registrar {
    governanceProgramId: PublicKey;
    realm: PublicKey;
    realmAuthority: PublicKey;
    realmGoverningTokenMint: PublicKey;
    votingMints: VotingMint[];
    //there are more fields but no use for them on ui yet
}

interface LockupKind {
    cliff: object;
    constant: object;
    daily: object;
    monthly: object;
    none: object;
}

interface Lockup {
    endTs: BN;
    kind: LockupKind;
    startTs: BN;
}

export interface Deposit {
    allowClawback: boolean;
    amountDepositedNative: BN;
    amountInitiallyLockedNative: BN;
    isUsed: boolean;
    lockup: Lockup;
    votingMintConfigIdx: number;
}
