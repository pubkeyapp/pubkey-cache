import { BN } from '@coral-xyz/anchor';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

import { chunks } from './chunks';
import { SIMULATION_WALLET, VsrClient } from './client';
import { Registrar, Voter, VOTER_INFO_EVENT_NAME } from './get-realms';
import { getVoterPDA } from './get-voter-pda';
import { logsToEvents } from './logs-to-events';

export async function getVotingPowersForWallets({
    client,
    registrarPk,
    existingRegistrar,
    walletPks,
    connection,
    latestBlockhash,
}: {
    client: VsrClient;
    connection: Connection;
    existingRegistrar: Registrar;
    latestBlockhash: Readonly<{
        blockhash: string;
        lastValidBlockHeight: number;
    }>;
    registrarPk: PublicKey;
    walletPks: PublicKey[];
}) {
    const clientProgramId = client.program.programId;
    const voterPks: PublicKey[] = [];
    const voters: (Voter | null)[] = [];
    const encodedTransactionsParsedByWallets: {
        tx: string;
        walletPk: string;
    }[] = [];
    const mintCfgs = existingRegistrar.votingMints;
    const events: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        event: any;
        walletPk: string;
    }[] = [];
    for (const walletPk of walletPks) {
        const { voter } = getVoterPDA(registrarPk, walletPk, clientProgramId);
        voterPks.push(voter);
    }

    const voterAccsResponse = await client?.program.account.voter.fetchMultiple(voterPks);
    voters.push(...(voterAccsResponse as (Voter | null)[]));

    if (voters.length) {
        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        for (const i in voters) {
            const voter = voters[i];
            const voterPk = voterPks[i];
            if (voter) {
                const hasDepositsWithCommunityMint = voter.deposits.find(
                    x => x.isUsed && mintCfgs[x.votingMintConfigIdx].baselineVoteWeightScaledFactor.gtn(0),
                );
                if (hasDepositsWithCommunityMint) {
                    const simulationWallet = new PublicKey(SIMULATION_WALLET);

                    const originalTx = new Transaction({ feePayer: simulationWallet });
                    const logVoterInfoIx = await client.program.methods
                        .logVoterInfo(1, 1)
                        .accounts({ registrar: registrarPk, voter: voterPk })
                        .instruction();
                    originalTx.add(logVoterInfoIx);

                    const transaction = originalTx;
                    transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
                    transaction.recentBlockhash = latestBlockhash.blockhash;
                    //@ts-expect-error this is good
                    const message = transaction._compile();
                    const signData = message.serialize();
                    //@ts-expect-error this is good
                    const wireTransaction = transaction._serialize(signData);
                    const encodedTransaction = wireTransaction.toString('base64');
                    encodedTransactionsParsedByWallets.push({
                        tx: encodedTransaction,
                        walletPk: voter.voterAuthority.toBase58(),
                    });
                }
            }
        }

        const chunkedEncodedTransactionsParsed = chunks(encodedTransactionsParsedByWallets, 100);
        // TODO Batch alert
        const simulations = await Promise.all(
            chunkedEncodedTransactionsParsed.map(txChunk =>
                fetch(connection.rpcEndpoint, {
                    body: JSON.stringify([
                        ...txChunk.map(encodedTransaction => ({
                            id: encodedTransaction.walletPk,
                            jsonrpc: '2.0',
                            method: 'simulateTransaction',
                            params: [
                                encodedTransaction.tx,
                                {
                                    commitment: 'recent',
                                    encoding: 'base64',
                                },
                            ],
                        })),
                    ]),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                }),
            ),
        );
        const logsJsons = await Promise.all(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            simulations.map((x: any) => {
                return x.json();
            }),
        );
        for (const logJson of logsJsons) {
            for (const result of logJson) {
                events.push(...logsToEvents(client.program, result.result.value.logs, result.id));
            }
        }

        return events
            .filter(x => x.event.name === VOTER_INFO_EVENT_NAME)
            .map(x => ({
                votingPower: (x.event?.data?.votingPower as BN) || new BN(0),
                walletPk: x.walletPk,
            }));
    }
    return null;
}
