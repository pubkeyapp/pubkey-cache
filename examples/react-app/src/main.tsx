import './index.css';

import { SolanaClientProvider } from '@pubkey-cache/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Header } from './components/header.tsx';
import { Root } from './routes/root.tsx';

const rootNode = document.getElementById('root')!;
const root = createRoot(rootNode);
root.render(
    <StrictMode>
        <SolanaClientProvider rpc="https://api.devnet.solana.com">
            <div>
                <Header />
                <main>
                    <Root />
                </main>
            </div>
        </SolanaClientProvider>
    </StrictMode>,
);
