import { type User } from '@/entities/user';
import { type UserRepository } from '@/repositories/userRepository';

export interface UserService {
  getUserInfo(token: string): Promise<User>;
  addIdPassword(token: string, body: { id: string; password: string }): Promise<{ token: string }>;
  attachFacebookAccount(token: string, body: { fb_id: string; fb_token: string }): Promise<{ token: string }>;
  detachFacebookAccount(token: string): Promise<{ token: string }>;
  isFbOnlyUser(user: User): boolean;
}

type Deps = { repositories: [UserRepository] };
export const getUserService = ({ repositories: [userRepository] }: Deps): UserService => {
  return {
    getUserInfo: (token: string) => userRepository.getUserInfo({ token }),
    addIdPassword: (token, body) => userRepository.addIdPassword({ token }, body),
    attachFacebookAccount: (token: string, body: { fb_id: string; fb_token: string }) =>
      userRepository.attachFacebookAccount({ token }, body),
    detachFacebookAccount: (token: string) => userRepository.detachFacebookAccount({ token }),
    isFbOnlyUser: (user) => !!user.fb_name && !user.local_id,
  };
};
