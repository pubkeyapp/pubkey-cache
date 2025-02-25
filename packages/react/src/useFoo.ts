import { foo } from '@pubkey-cache/core';

export function useFoo() {
    return { foo: foo() };
}
