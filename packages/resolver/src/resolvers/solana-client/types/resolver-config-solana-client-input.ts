import { ResolverConfigSolanaClientType } from './resolver-config-solana-client-type';

export type ResolverConfigSolanaClientInput = Partial<Omit<ResolverConfigSolanaClientType, 'type'>> & {
    endpoint: string;
};
