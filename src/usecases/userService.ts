import { User } from '@/entities/user';
import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { UserRepository, userRepository } from '@/repositories/userRepository';

import { AuthService, authService } from './authService';

export interface UserService {
  getUserInfo(token: string): Promise<User>;
}

const getUserService = (args: {
  services: [AuthService];
  repositories: [UserRepository, EnvRepository];
}): UserService => {
  const apikey = args.services[0].getApiKey();
  const baseUrl = args.repositories[1].getBaseUrl();

  return {
    getUserInfo: (token: string) => args.repositories[0].getUserInfo({ baseUrl, apikey, token }),
  };
};

export const userService = getUserService({ services: [authService], repositories: [userRepository, envRepository] });
