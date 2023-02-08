import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { envService } from '@/usecases/envService';

import App from './App';
import { truffleClient } from './clients/truffle';

window.git = { sha: envService.getGitSha(), tag: envService.getGitTag() };
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, onError: (err) => truffleClient.capture(new Error(JSON.stringify(err))) },
  },
});

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
