import { envService } from '@/usecases';

import { getApiClient } from './api';

export const snuttApiClient = getApiClient({
  baseURL: envService.getBaseUrl(),
  headers: { 'x-access-apikey': envService.getApiKey() },
});
