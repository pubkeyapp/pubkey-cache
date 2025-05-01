export interface ResolverResult {
    addresses: string[];
    amount: number;
    assets: ResolverResultAsset[];
    owner: string;
}

export interface ResolverResultAsset {
    content: { metadata: { name: string } };
    id: string;
}
