import * as v from 'valibot';

import { getResolverConfigHeliusSchema } from '../get-resolver-config-helius-schema';

export type ResolverConfigHeliusType = v.InferOutput<ReturnType<typeof getResolverConfigHeliusSchema>>;
