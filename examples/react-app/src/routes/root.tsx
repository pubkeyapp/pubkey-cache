import { foo as coreFoo } from '@pubkey-cache/core';
import { useFoo } from '@pubkey-cache/react';

export function Root() {
    const foo = useFoo();
    const coreFooResult = coreFoo();

    return (
        <div>
            <pre>{JSON.stringify({ coreFooResult, foo }, null, 4)}</pre>
        </div>
    );
}
