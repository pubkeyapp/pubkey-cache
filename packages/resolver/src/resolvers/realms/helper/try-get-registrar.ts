import { PublicKey } from '@solana/web3.js';

import { VsrClient } from './client';
import { Registrar } from './get-realms';

export async function tryGetRegistrar(registrarPk: PublicKey, client: Pick<VsrClient, 'program'>) {
    try {
        const existingRegistrar = await client.program.account.registrar.fetch(registrarPk);
        return existingRegistrar as Registrar;
    } catch {
        return null;
    }
}
