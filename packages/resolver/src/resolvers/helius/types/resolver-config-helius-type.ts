import { z } from 'zod';

import { ResolverConfigHeliusSchema } from '../resolver-config-helius-schema';

export type ResolverConfigHeliusType = z.infer<typeof ResolverConfigHeliusSchema>;
