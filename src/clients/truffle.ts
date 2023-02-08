import { getTruffleClient } from '@wafflestudio/truffle-browser';

import { envService } from '@/usecases/envService';

export const truffleClient = getTruffleClient({
  enabled: envService.getNodeEnv() === 'production' && envService.getAppEnv() !== 'test',
  app: { name: 'snutt-webclient', phase: envService.getAppEnv() },
  apiKey: envService.getTruffleApiKey(),
});
