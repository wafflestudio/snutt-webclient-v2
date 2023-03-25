import { authRepository, colorRepository } from '@/repositories';
import { storageRepository } from '@/repositories/storageRepository';
import { userRepository } from '@/repositories/userRepository';

import { getAuthService } from './authService';
import { getColorService } from './colorService';
import { envService } from './envService';

export const authService = getAuthService({
  repositories: [storageRepository, authRepository, userRepository],
  services: [envService],
});

export const colorService = getColorService({
  repositories: [colorRepository],
});
