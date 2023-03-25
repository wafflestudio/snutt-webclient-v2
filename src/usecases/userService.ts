import { User } from '@/entities/user';
import { UserRepository, userRepository } from '@/repositories/userRepository';
import { AuthService } from '@/usecases/authService';
import { EnvService, envService } from '@/usecases/envService';

import { authService } from '.';

export interface UserService {
  getUserInfo(token: string): Promise<User>;
  addIdPassword(token: string, body: { id: string; password: string }): Promise<{ token: string }>;
  attachFacebookAccount(token: string, body: { fb_id: string; fb_token: string }): Promise<{ token: string }>;
  detachFacebookAccount(token: string): Promise<{ token: string }>;
  isFbOnlyUser(user: User): boolean;
}

const getUserService = (args: { services: [AuthService, EnvService]; repositories: [UserRepository] }): UserService => {
  const apikey = args.services[0].getApiKey();
  const baseUrl = args.services[1].getBaseUrl();

  return {
    getUserInfo: (token: string) => args.repositories[0].getUserInfo({ baseUrl, apikey, token }),
    addIdPassword: (token, body) => args.repositories[0].addIdPassword({ baseUrl, apiKey: apikey, token }, body),
    attachFacebookAccount: (token: string, body: { fb_id: string; fb_token: string }) =>
      args.repositories[0].attachFacebookAccount({ baseUrl, apikey, token }, body),
    detachFacebookAccount: (token: string) => args.repositories[0].detachFacebookAccount({ baseUrl, apikey, token }),
    isFbOnlyUser: (user) => !!user.fb_name && !user.local_id,
  };
};

export const userService = getUserService({ services: [authService, envService], repositories: [userRepository] });
