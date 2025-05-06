import { ResolverConfigHeliusType } from './resolver-config-helius-type';

export type ResolverConfigHeliusInput = Partial<Omit<ResolverConfigHeliusType, 'type'>> & { heliusApiKey: string };
