import { PublicKey } from '@solana/web3.js';

export function getRegistrarPDA(realmPk: PublicKey, mint: PublicKey, clientProgramId: PublicKey) {
    const [registrar, registrarBump] = PublicKey.findProgramAddressSync(
        [realmPk.toBuffer(), Buffer.from('registrar'), mint.toBuffer()],
        clientProgramId,
    );
    return {
        registrar,
        registrarBump,
    };
}
