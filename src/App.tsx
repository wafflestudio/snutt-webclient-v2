import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { getApiClient } from '@/clients/api';
import { getStorageClient } from '@/clients/storage';
import { truffleClient } from '@/clients/truffle';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
// 이 파일은 전체 프로젝트에서 유일하게 @/constants/environment 에 접근할 수 있습니다.
// eslint-disable-next-line no-restricted-imports
import { viteEnvironmentVariables } from '@/constants/environment';
import { serviceContext } from '@/contexts/ServiceContext';
import { ErrorPage } from '@/pages/error';
import { Main } from '@/pages/main';
import { MyPage } from '@/pages/mypage';
import { SignUp } from '@/pages/signup';
import { getAuthRepository } from '@/repositories/authRepository';
import { getColorRepository } from '@/repositories/colorRepository';
import { getEnvRepository } from '@/repositories/envRepository';
import { getErrorRepository } from '@/repositories/errorRepository';
import { getFeedbackRepository } from '@/repositories/feedbackRepository';
import { getNotificationRepository } from '@/repositories/notificationRepository';
import { getSearchRepository } from '@/repositories/searchRepository';
import { getSemesterRepository } from '@/repositories/semesterRepository';
import { getStorageRepository } from '@/repositories/storageRepository';
import { getTimetableRepository } from '@/repositories/timetableRepository';
import { getUserRepository } from '@/repositories/userRepository';
import { getAuthService } from '@/usecases/authService';
import { getColorService } from '@/usecases/colorService';
import { getEnvService } from '@/usecases/envService';
import { getErrorService } from '@/usecases/errorService';
import { getFeedbackService } from '@/usecases/feedbackService';
import { getHourMinutePickerService } from '@/usecases/hourMinutePickerService';
import { getHourMinuteService } from '@/usecases/hourMinuteService';
import { getLectureService } from '@/usecases/lectureService';
import { getNotificationService } from '@/usecases/notificationService';
import { getSearchService } from '@/usecases/searchService';
import { getSemesterService } from '@/usecases/semesterService';
import { getTimeMaskService } from '@/usecases/timeMaskService';
import { getTimetableService } from '@/usecases/timetableService';
import { getTimetableViewService } from '@/usecases/timetableViewService';
import { get } from '@/utils/object/get';

import { useTokenContext } from './contexts/tokenContext';
import { Landing } from './pages/landing';
import { NotFoundPage } from './pages/not-found';

function App() {
  const { clearToken, token } = useTokenContext();
  const [isWrongTokenDialogOpen, setWrongTokenDialogOpen] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (get(error, ['errcode']) === 8194) setWrongTokenDialogOpen(true);
            else truffleClient.capture(error);
          },
        }),
        defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
      }),
  );

  const router = createBrowserRouter([
    {
      children: [
        ...(token
          ? [
              { path: '/', element: <Main /> },
              { path: '/mypage', element: <MyPage /> },
            ]
          : [
              { path: '/', element: <Landing /> },
              { path: '/signup', element: <SignUp /> },
            ]),
        { path: '/*', element: <NotFoundPage /> },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  const onClickLogout = () => {
    clearToken();
    setWrongTokenDialogOpen(false);
  };

  const services = useMemo(() => {
    const persistStorage = getStorageClient(true);
    const temporaryStorage = getStorageClient(false);

    const envRepository = getEnvRepository({ external: [viteEnvironmentVariables] });
    const envService = getEnvService({ repositories: [envRepository] });

    const snuttApiClient = getApiClient({
      baseURL: envService.getBaseUrl(),
      headers: { 'x-access-apikey': envService.getApiKey() },
    });

    const userRepository = getUserRepository({ clients: [snuttApiClient] });
    const storageRepository = getStorageRepository({ clients: [persistStorage, temporaryStorage] });
    const authRepository = getAuthRepository({ clients: [snuttApiClient] });
    const timetableRepository = getTimetableRepository({ clients: [snuttApiClient] });
    const semesterRepository = getSemesterRepository({ clients: [snuttApiClient] });
    const searchRepository = getSearchRepository({ clients: [snuttApiClient] });
    const notificationRepository = getNotificationRepository({ clients: [snuttApiClient] });
    const feedbackRepository = getFeedbackRepository({ clients: [snuttApiClient] });
    const errorRepository = getErrorRepository();
    const colorRepository = getColorRepository({ clients: [snuttApiClient] });

    const colorService = getColorService({ repositories: [colorRepository] });
    const errorService = getErrorService({ repositories: [errorRepository] });
    const feedbackService = getFeedbackService({ repositories: [feedbackRepository] });
    const notificationService = getNotificationService({ repositories: [notificationRepository] });
    const searchService = getSearchService({ repositories: [searchRepository] });
    const timetableService = getTimetableService({ repositories: [timetableRepository] });
    const lectureService = getLectureService();
    const timeMaskService = getTimeMaskService();
    const hourMinuteService = getHourMinuteService();
    const hourMinutePickerService = getHourMinutePickerService({ services: [hourMinuteService] });
    const timetableViewService = getTimetableViewService({ repositories: [storageRepository] });
    const authService = getAuthService({ repositories: [storageRepository, authRepository, userRepository] });
    const semesterService = getSemesterService({ repositories: [semesterRepository] });

    return {
      lectureService,
      timeMaskService,
      hourMinutePickerService,
      hourMinuteService,
      timetableViewService,
      authService,
      envService,
      timetableService,
      semesterService,
      searchService,
      notificationService,
      feedbackService,
      errorService,
      colorService,
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <serviceContext.Provider value={services}>
        <RouterProvider router={router} />
        <GlobalStyles />
        <ReactQueryDevtools />
        <Dialog open={isWrongTokenDialogOpen}>
          <Dialog.Title>인증정보가 올바르지 않아요</Dialog.Title>
          <Dialog.Content>다시 로그인해 주세요</Dialog.Content>
          <Dialog.Actions>
            <Button data-testid="wrong-token-dialog-logout" onClick={onClickLogout}>
              로그아웃하기
            </Button>
          </Dialog.Actions>
        </Dialog>
      </serviceContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    background: rgb(247, 248, 249);
    margin: 0;
  }
`;
