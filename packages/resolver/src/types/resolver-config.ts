import { ResolverConfigHelius } from '../resolvers/helius/types/resolver-config-helius';
import { ResolverConfigSolanaClient } from '../resolvers/solana-client/types/resolver-config-solana-client';

export type ResolverConfig = ResolverConfigHelius | ResolverConfigSolanaClient;
