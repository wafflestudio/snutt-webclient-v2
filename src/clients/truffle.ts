import { getTruffleClient } from '@wafflestudio/truffle-browser';

import { envService } from '@/usecases';

export const truffleClient = getTruffleClient({
  enabled: envService.getNodeEnv() === 'production' && envService.getAppEnv() !== 'test',
  app: { name: 'snutt-webclient-v2', phase: envService.getAppEnv() },
  apiKey: envService.getTruffleApiKey(),
});
