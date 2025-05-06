import { ResolverConfigType } from '../../../types/resolver-config-type';
import { ResolverConfigHeliusType } from './resolver-config-helius-type';

export interface ResolverConfigHelius extends ResolverConfigHeliusType {
    type: ResolverConfigType.Helius;
}
