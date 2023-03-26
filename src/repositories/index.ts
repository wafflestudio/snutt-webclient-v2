import { snuttApiClient } from '@/clients';
// 이 파일은 전체 프로젝트에서 유일하게 @/constants/environment 에 접근할 수 있습니다.
// eslint-disable-next-line no-restricted-imports
import { viteEnvironmentVariables } from '@/constants/environment';

import { getAuthRepository } from './authRepository';
import { getColorRepository } from './colorRepository';
import { getEnvRepository } from './envRepository';

export const authRepository = getAuthRepository({ clients: [snuttApiClient] });
export const colorRepository = getColorRepository({ clients: [snuttApiClient] });
export const envRepository = getEnvRepository({ external: [viteEnvironmentVariables] });
