import { snuttApiClient } from '@/clients';

import { getAuthRepository } from './authRepository';

export const authRepository = getAuthRepository({ clients: [snuttApiClient] });
