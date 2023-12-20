import { getApiClient } from '@/clients/api';
// 이 파일은 전체 프로젝트에서 유일하게 @/constants/environment 에 접근할 수 있습니다.
// eslint-disable-next-line no-restricted-imports
import { viteEnvironmentVariables } from '@/constants/environment';
import { getColorRepository } from '@/repositories/colorRepository';
import { getEnvRepository } from '@/repositories/envRepository';
import { getUserRepository } from '@/repositories/userRepository';
import { getColorService } from '@/usecases/colorService';
import { getEnvService } from '@/usecases/envService';
import { getUserService } from '@/usecases/userService';

const envRepository = getEnvRepository({ external: [viteEnvironmentVariables] });
export const envService = getEnvService({ repositories: [envRepository] });

const snuttApiClient = getApiClient({
  baseURL: envService.getBaseUrl(),
  headers: { 'x-access-apikey': envService.getApiKey() },
});

const userRepository = getUserRepository({ clients: [snuttApiClient] });
export const userService = getUserService({ repositories: [userRepository] });

const colorRepository = getColorRepository({ clients: [snuttApiClient] });
export const colorService = getColorService({ repositories: [colorRepository] });
