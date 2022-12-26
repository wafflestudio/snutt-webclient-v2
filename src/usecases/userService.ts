import { User } from '@/entities/user';
import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { UserRepository, userRepository } from '@/repositories/userRepository';

import { AuthService, authService } from './authService';

export interface UserService {
  getUserInfo(): Promise<User>;
}

const getAuthService = (args: {
  services: [AuthService];
  repositories: [UserRepository, EnvRepository];
}): UserService => {
  const apikey = args.services[0].getApiKey();
  const token = args.services[0].getToken();
  const baseUrl = args.repositories[1].getBaseUrl();

  return {
    getUserInfo: () => args.repositories[0].getUserInfo({ baseUrl, apikey, token }),
  };
};

export const userService = getAuthService({ services: [authService], repositories: [userRepository, envRepository] });
