import { snuttApiClient } from '@/clients';

import { getAuthRepository } from './authRepository';
import { getColorRepository } from './colorRepository';

export const authRepository = getAuthRepository({ clients: [snuttApiClient] });
export const colorRepository = getColorRepository({ clients: [snuttApiClient] });
