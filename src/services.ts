import { getApiClient } from '@/clients/api';
// 이 파일은 전체 프로젝트에서 유일하게 @/constants/environment 에 접근할 수 있습니다.
// eslint-disable-next-line no-restricted-imports
import { viteEnvironmentVariables } from '@/constants/environment';
import { getAuthRepository } from '@/repositories/authRepository';
import { getColorRepository } from '@/repositories/colorRepository';
import { getEnvRepository } from '@/repositories/envRepository';
import { getErrorRepository } from '@/repositories/errorRepository';
import { getFeedbackRepository } from '@/repositories/feedbackRepository';
import { getNotificationRepository } from '@/repositories/notificationRepository';
import { getSearchRepository } from '@/repositories/searchRepository';
import { getSemesterRepository } from '@/repositories/semesterRepository';
import { getStorageRepository } from '@/repositories/storageRepository';
import { userRepository } from '@/repositories/userRepository';
import { getAuthService } from '@/usecases/authService';
import { getColorService } from '@/usecases/colorService';
import { getEnvService } from '@/usecases/envService';
import { getErrorService } from '@/usecases/errorService';
import { getFeedbackService } from '@/usecases/feedbackService';
import { getNotificationService } from '@/usecases/notificationService';
import { getSearchService } from '@/usecases/searchService';
import { getSemesterService } from '@/usecases/semesterService';

const envRepository = getEnvRepository({ external: [viteEnvironmentVariables] });
export const envService = getEnvService({ repositories: [envRepository] });

const storageRepository = getStorageRepository();

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

const errorRepository = getErrorRepository();
export const errorService = getErrorService({ repositories: [errorRepository] });

const feedbackRepository = getFeedbackRepository({ clients: [snuttApiClient] });
export const feedbackService = getFeedbackService({ repositories: [feedbackRepository] });

const notificationRepository = getNotificationRepository({ clients: [snuttApiClient] });
export const notificationService = getNotificationService({ repositories: [notificationRepository] });

const searchRepository = getSearchRepository({ clients: [snuttApiClient] });
export const searchService = getSearchService({ repositories: [searchRepository] });

const semesterRepository = getSemesterRepository({ clients: [snuttApiClient] });
export const semesterService = getSemesterService({ repositories: [semesterRepository] });
