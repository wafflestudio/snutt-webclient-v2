import { authRepository } from '@/repositories';
import { storageRepository } from '@/repositories/storageRepository';
import { userRepository } from '@/repositories/userRepository';

import { getAuthService } from './authService';
import { envService } from './envService';

export const authService = getAuthService({
  repositories: [storageRepository, authRepository, userRepository],
  services: [envService],
});
