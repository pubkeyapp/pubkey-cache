export interface ResolverResult<T = ResolverResultAsset> {
    addresses: string[];
    amount: number;
    assets: T[];
    owner: string;
}

export interface ResolverResultAsset {
    content: { metadata: { name: string } };
    id: string;
}
