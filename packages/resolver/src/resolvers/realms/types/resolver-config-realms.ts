import { ResolverConfigType } from '../../../types/resolver-config-type';
import { ResolverConfigRealmsType } from './resolver-config-realms-type';

export interface ResolverConfigRealms extends ResolverConfigRealmsType {
    type: ResolverConfigType.Realms;
}
