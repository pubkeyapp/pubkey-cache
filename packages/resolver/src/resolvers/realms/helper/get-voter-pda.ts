import { PublicKey } from '@solana/web3.js';

export function getVoterPDA(registrar: PublicKey, walletPk: PublicKey, clientProgramId: PublicKey) {
    const [voter, voterBump] = PublicKey.findProgramAddressSync(
        [registrar.toBuffer(), Buffer.from('voter'), walletPk.toBuffer()],
        clientProgramId,
    );

    return {
        voter,
        voterBump,
    };
}
