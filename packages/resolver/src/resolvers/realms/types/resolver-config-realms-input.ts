import { ResolverConfigRealmsType } from './resolver-config-realms-type';

export type ResolverConfigRealmsInput = Partial<Omit<ResolverConfigRealmsType, 'type'>> & {
    realms: string;
};
