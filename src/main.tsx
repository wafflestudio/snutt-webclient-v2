import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { envService } from '@/usecases/envService';

import App from './App';

window.git = envService.getGitSha();
const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

function startApp() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>,
  );
}

if (envService.getAppEnv() === 'test') {
  (async () => {
    const { worker } = await import('@/mocks/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
    startApp();
  })();
} else {
  startApp();
}
