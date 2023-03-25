import { envService } from '@/usecases/envService';

import { getApiClient } from './api';

export const snuttApiClient = getApiClient({
  baseURL: envService.getBaseUrl(),
  headers: { 'x-access-apikey': envService.getApiKey() },
});
