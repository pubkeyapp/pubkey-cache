import { ResolverConfigType } from '../../../types/resolver-config-type';
import { ResolverConfigSolanaClientType } from './resolver-config-solana-client-type';

export interface ResolverConfigSolanaClient extends ResolverConfigSolanaClientType {
    type: ResolverConfigType.SolanaClient;
}
