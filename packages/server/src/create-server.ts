import { getResolverOwner, getResolverSnapshot, Resolver } from '@pubkey-cache/resolver';
import { createApp, createRouter, defineEventHandler, eventHandler, getQuery, H3Event } from 'h3';
import { Storage } from 'unstorage';
import { createStorageServer } from 'unstorage/server';

export function createServer({ storage, resolvers }: { resolvers: Resolver[]; storage: Storage }) {
    const storageServer = createStorageServer(storage);

    const app = createApp();
    const router = createRouter()
        .get(
            '/resolvers',
            defineEventHandler(() => {
                return resolvers;
            }),
        )
        .get(
            '/resolvers/:resolverId/snapshot.json',
            defineEventHandler(async (event: H3Event) => {
                const query = getQuery(event);
                const resolverId = event.context.params?.resolverId ?? query.resolverId;
                if (!resolverId) {
                    return { message: 'Missing resolver id' };
                }
                const resolver = resolvers.find(resolver => resolver.id === resolverId);
                if (!resolver) {
                    return { message: 'Resolver not found' };
                }

                // Get the resolver result from storage
                const result = await getResolverSnapshot({ resolver, storage });

                return result ? result : { message: 'No snapshot found' };
            }),
        )
        .get(
            '/resolvers/:resolverId/owner/:owner',
            defineEventHandler(async (event: H3Event) => {
                const query = getQuery(event);
                const resolverId = event.context.params?.resolverId ?? query.resolverId;
                if (!resolverId) {
                    return { message: 'Missing resolver id' };
                }
                const resolver = resolvers.find(resolver => resolver.id === resolverId);
                if (!resolver) {
                    return { message: 'Resolver not found' };
                }
                const owner = event.context.params?.owner ?? query.owner;
                if (!owner || typeof owner !== 'string') {
                    return { message: 'Missing owner' };
                }

                const result = await getResolverOwner({ owner, resolver, storage });

                return result ? result : { message: 'No owner found' };
            }),
        );

    app.use(router);
    app.use(
        '/storage/',
        eventHandler((event: H3Event) => {
            return storageServer.handle(event.node.req, event.node.res);
        }),
    );

    return app;
}
