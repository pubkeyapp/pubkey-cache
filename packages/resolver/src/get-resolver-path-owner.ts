export function getResolverPathOwner(base: string, address: string = ''): string {
    return `${base}:owner${address ? `:${address}` : ''}`;
}
