import { getApiClient } from '@/clients/api';
// 이 파일은 전체 프로젝트에서 유일하게 @/constants/environment 에 접근할 수 있습니다.
// eslint-disable-next-line no-restricted-imports
import { viteEnvironmentVariables } from '@/constants/environment';
import { getAuthRepository } from '@/repositories/authRepository';
import { getColorRepository } from '@/repositories/colorRepository';
import { getEnvRepository } from '@/repositories/envRepository';
import { storageRepository } from '@/repositories/storageRepository';
import { userRepository } from '@/repositories/userRepository';
import { getAuthService } from '@/usecases/authService';
import { getColorService } from '@/usecases/colorService';
import { getEnvService } from '@/usecases/envService';

const envRepository = getEnvRepository({ external: [viteEnvironmentVariables] });
export const envService = getEnvService({ repositories: [envRepository] });

const snuttApiClient = getApiClient({
  baseURL: envService.getBaseUrl(),
  headers: { 'x-access-apikey': envService.getApiKey() },
});

const authRepository = getAuthRepository({ clients: [snuttApiClient] });
export const authService = getAuthService({
  repositories: [storageRepository, authRepository, userRepository],
  services: [envService],
});

const colorRepository = getColorRepository({ clients: [snuttApiClient] });
export const colorService = getColorService({ repositories: [colorRepository] });
