import { EnvRepository, envRepository } from '@/repositories/envRepository';

export interface AuthService {
  getApiKey(): string;
  getToken(): string;
}

const getAuthService = (args: { repositories: [EnvRepository] }): AuthService => {
  return {
    getApiKey: () => args.repositories[0].getApiKey(),
    getToken: () => args.repositories[0].getToken(), // TODO: change (로컬 개발용으로 환경변수에서 불러옴)
  };
};

export const authService = getAuthService({ repositories: [envRepository] });
