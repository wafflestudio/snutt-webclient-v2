import { getTruffleClient } from '@wafflestudio/truffle-browser';

import { envService } from '@/usecases/envService';

export const truffleClient = getTruffleClient({
  enabled: envService.getNodeEnv() === 'production' || true,
  app: { name: 'snutt-webclient', phase: envService.getAppEnv() },
  apiKey: envService.getTruffleApiKey(),
});
