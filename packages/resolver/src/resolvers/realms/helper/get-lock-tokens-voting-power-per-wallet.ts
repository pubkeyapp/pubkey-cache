import { BN } from '@coral-xyz/anchor';
import { BlockhashWithExpiryBlockHeight, Connection, PublicKey } from '@solana/web3.js';

import { VsrClient } from './client';
import { getRegistrarPDA } from './get-registrar-pda';
import { getVotingPowersForWallets } from './get-voting-powers-for-wallets';
import { tryGetRegistrar } from './try-get-registrar';

export async function getLockTokensVotingPowerPerWallet({
    client,
    connection,
    latestBlockhash,
    realm,
    tokenMint,
    wallets,
}: {
    client: VsrClient;
    connection: Connection;
    latestBlockhash?: BlockhashWithExpiryBlockHeight;
    realm: PublicKey;
    tokenMint: PublicKey;
    wallets: PublicKey[];
}) {
    const { registrar } = getRegistrarPDA(realm, tokenMint, client.program.programId);
    const existingRegistrar = await tryGetRegistrar(registrar, client);

    const _latestBlockhash = latestBlockhash || (await connection.getLatestBlockhash());
    const votingPowers = await getVotingPowersForWallets({
        client,
        connection,
        existingRegistrar: existingRegistrar!,
        latestBlockhash: _latestBlockhash,
        registrarPk: registrar,
        walletPks: wallets,
    });

    if (votingPowers) {
        const votingPowerObj: Record<string, BN> = {};
        for (const record of votingPowers) {
            votingPowerObj[record.walletPk] = record.votingPower;
        }

        return votingPowerObj;
    }
    return {};
}
