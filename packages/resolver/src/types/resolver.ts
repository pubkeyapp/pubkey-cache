import { ResolverType } from './resolver-type';

export interface Resolver {
    address: string;
    id: string;
    type: ResolverType;
}
