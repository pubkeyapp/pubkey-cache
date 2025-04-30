import { Resolver } from '@pubkey-cache/resolver';
import { toNodeListener } from 'h3';
import { listen } from 'listhen';
import { Storage } from 'unstorage';

import { createServer } from './create-server';

export async function server({
    hostname,
    port,
    storage,
    resolvers,
}: {
    hostname: string;
    port: number;
    resolvers: Resolver[];
    storage: Storage;
}) {
    const app = createServer({ resolvers, storage });

    return await listen(toNodeListener(app), { hostname, port });
}
