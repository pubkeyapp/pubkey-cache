import { Resolver } from './types/resolver';

export function getResolverId(resolver: Omit<Resolver, 'id'>): string {
    return `${resolver.type}:${resolver.address}`;
}
