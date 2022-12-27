import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { envService } from '@/usecases/envService';

import App from './App';

if (envService.getAppEnv() === 'test') {
  (async () => {
    const { worker } = await import('@/mocks/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
    startApp();
  })();
} else {
  startApp();
}

function startApp() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
