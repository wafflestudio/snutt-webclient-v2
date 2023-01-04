import { User } from '@/entities/user';
import { UserRepository, userRepository } from '@/repositories/userRepository';
import { AuthService, authService } from '@/usecases/authService';
import { EnvService, envService } from '@/usecases/envService';

export interface UserService {
  getUserInfo(token: string): Promise<User>;
}

const getUserService = (args: { services: [AuthService, EnvService]; repositories: [UserRepository] }): UserService => {
  const apikey = args.services[0].getApiKey();
  const baseUrl = args.services[1].getBaseUrl();

  return {
    getUserInfo: (token: string) => args.repositories[0].getUserInfo({ baseUrl, apikey, token }),
  };
};

export const userService = getUserService({ services: [authService, envService], repositories: [userRepository] });
