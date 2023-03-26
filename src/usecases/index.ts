import { authRepository, colorRepository, envRepository } from '@/repositories';
import { storageRepository } from '@/repositories/storageRepository';
import { userRepository } from '@/repositories/userRepository';

import { getAuthService } from './authService';
import { getColorService } from './colorService';
import { getEnvService } from './envService';

export const envService = getEnvService({ repositories: [envRepository] });
export const colorService = getColorService({ repositories: [colorRepository] });
export const authService = getAuthService({
  repositories: [storageRepository, authRepository, userRepository],
  services: [envService],
});
