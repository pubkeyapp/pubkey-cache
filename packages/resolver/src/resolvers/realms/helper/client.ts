import { BN, EventParser, Program, Provider, web3 } from '@coral-xyz/anchor';
import { Client } from '@solana/governance-program-library';
import { SYSTEM_PROGRAM_ID } from '@solana/spl-governance';
import {
    Connection,
    PublicKey,
    SYSVAR_INSTRUCTIONS_PUBKEY,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js';

import { getVoterPDA } from './get-voter-pda';
import { IDL, VoterStakeRegistry } from './voter_stake_registry';

export const DEFAULT_VSR_ID = new web3.PublicKey('vsr2nfGVNHmSY8uxoBGqq8AQbwz3JwaEaHqGbsTPXqQ');

export class VsrClient extends Client<typeof IDL> {
    readonly requiresInputVoterWeight = false;

    getRegistrarPDA(realm: PublicKey, mint: PublicKey) {
        const [registrar, registrarBump] = PublicKey.findProgramAddressSync(
            [realm.toBuffer(), Buffer.from('registrar'), mint.toBuffer()],
            this.program.programId,
        );
        return {
            registrar,
            registrarBump,
        };
    }

    async getVoterWeightRecordPDA(realm: PublicKey, mint: PublicKey, walletPk: PublicKey) {
        const { registrar } = this.getRegistrarPDA(realm, mint);

        const [voterWeightPk, voterWeightRecordBump] = PublicKey.findProgramAddressSync(
            [registrar.toBuffer(), Buffer.from('voter-weight-record'), walletPk.toBuffer()],
            this.program.programId,
        );
        return await Promise.resolve({
            voterWeightPk,
            voterWeightRecordBump,
        });
    }

    /**
     * Creates a voter weight record account and voter account for this VSR realm and user.
     * Although the program creates both, this function keeps the 'createVoterWeightRecord' name to align with
     * other plugins. The client code should not need to know the difference.
     * @param voter
     * @param realm
     * @param mint
     */
    async createVoterWeightRecord(
        voter: PublicKey,
        realm: PublicKey,
        mint: PublicKey,
    ): Promise<TransactionInstruction> {
        const { registrar } = this.getRegistrarPDA(realm, mint);
        const { voter: voterPDA, voterBump } = getVoterPDA(registrar, voter, this.program.programId);
        const { voterWeightPk, voterWeightRecordBump } = await this.getVoterWeightRecordPDA(realm, mint, voterPDA);
        return await this.program.methods
            .createVoter(voterBump, voterWeightRecordBump)
            .accounts({
                instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
                payer: voter,
                registrar: registrar,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SYSTEM_PROGRAM_ID,
                voter: voterPDA,
                voterAuthority: voter,
                voterWeightRecord: voterWeightPk,
            })
            .instruction();
    }

    async getVoterWeightRecord(realm: PublicKey, mint: PublicKey, voter: PublicKey) {
        const { registrar } = this.getRegistrarPDA(realm, mint);
        // This is a workaround for the fact that the VSR program IDL does not include the voterWeightRecord account
        const votingPower = await fetchVotingPower(
            this.program.provider.connection,
            this.program.programId,
            registrar,
            voter,
        );

        const power = votingPower.result ?? new BN(0);

        return { voterWeight: power };
    }

    async updateVoterWeightRecord(voter: PublicKey, realm: PublicKey, mint: PublicKey) {
        const pluginProgramId = this.program.programId;
        const { registrar } = this.getRegistrarPDA(realm, mint);
        const { voter: voterPDA } = getVoterPDA(registrar, voter, pluginProgramId);
        const { voterWeightPk } = await this.getVoterWeightRecordPDA(realm, mint, voter);
        const ix = await this.program.methods
            .updateVoterWeightRecord()
            .accounts({
                registrar,
                systemProgram: SYSTEM_PROGRAM_ID,
                voter: voterPDA,
                voterWeightRecord: voterWeightPk,
            })
            .instruction();

        return { pre: [ix] };
    }

    async calculateVoterWeight(voter: PublicKey, realm: PublicKey, mint: PublicKey): Promise<BN | null> {
        // TODO should use vsr govpower multi? see useVsrGovpowerMulti
        const { registrar: registrarPk } = this.getRegistrarPDA(realm, mint);
        const programId = this.program.programId;
        if (registrarPk === undefined || programId === undefined) {
            return null;
        }

        const { voter: voterPk } = getVoterPDA(registrarPk, voter, programId);
        const votingPower = await fetchVotingPower(this.program.provider.connection, programId, registrarPk, voterPk);

        return votingPower.result ?? new BN(0);
    }

    constructor(program: Program<VoterStakeRegistry>, devnet: boolean) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        super(program as any, devnet);
    }

    static connect(provider: Provider, programId: web3.PublicKey = DEFAULT_VSR_ID, devnet = false): VsrClient {
        const idl = IDL;

        return new VsrClient(new Program<VoterStakeRegistry>(idl, programId, provider), devnet);
    }

    async createMaxVoterWeightRecord(): Promise<TransactionInstruction | null> {
        return await Promise.resolve(null);
    }

    async updateMaxVoterWeightRecord(): Promise<TransactionInstruction | null> {
        return await Promise.resolve(null);
    }
}

async function fetchVotingPower(
    connection: Connection,
    pluginId: PublicKey,
    registrarPk: PublicKey,
    voterPk: PublicKey,
) {
    const program = new Program<VoterStakeRegistry>(IDL, pluginId, {
        connection,
    });
    const logs = await fetchVotingPowerSimulation(connection, program, registrarPk, voterPk);
    return extractVotingPowerFromSimulation(logs);
}

const VOTER_INFO_EVENT_NAME = 'VoterInfo';

function extractVotingPowerFromSimulation(logs: Awaited<ReturnType<typeof fetchVotingPowerSimulation>>) {
    const votingPowerEntry = logs.find(x => x.name === VOTER_INFO_EVENT_NAME);
    return votingPowerEntry
        ? ({
              found: true,
              result: votingPowerEntry.data.votingPower as BN,
          } as const)
        : ({ found: false, result: undefined } as const);
}

export const SIMULATION_WALLET = 'ENmcpFCpxN1CqyUjuog9yyUVfdXBKF3LVCwLr7grJZpk';

async function fetchVotingPowerSimulation(
    connection: Connection,
    program: Program<VoterStakeRegistry>,
    registrar: PublicKey,
    voter: PublicKey,
    depositEntryBegin = 0,
    depositEntryCount = 0,
) {
    const ix = await program.methods
        .logVoterInfo(depositEntryBegin, depositEntryCount)
        .accounts({ registrar, voter })
        .instruction();
    const transaction = new Transaction({
        feePayer: new PublicKey(SIMULATION_WALLET),
    }).add(ix);
    const sim = await connection.simulateTransaction(transaction);
    const parser = new EventParser(program.programId, program.coder);
    if (sim.value.logs === null) {
        console.error('log_voter_info returned no logs');
        return [];
    }
    return [...parser.parseLogs(sim.value.logs)];
}
