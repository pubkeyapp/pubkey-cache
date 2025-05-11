import * as v from 'valibot';

import { getResolverConfigRealmsSchema } from '../get-resolver-config-realms-schema';

export type ResolverConfigRealmsType = v.InferOutput<ReturnType<typeof getResolverConfigRealmsSchema>>;
