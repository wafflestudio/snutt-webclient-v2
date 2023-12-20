import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getTruffleClient } from '@wafflestudio/truffle-browser';
import { useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { getApiClient } from '@/clients/api';
import { getStorageClient } from '@/clients/storage';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { envContext } from '@/contexts/EnvContext';
import { serviceContext } from '@/contexts/ServiceContext';
import { useGuardContext } from '@/hooks/useGuardContext';
import { ErrorPage } from '@/pages/error';
import { Main } from '@/pages/main';
import { MyPage } from '@/pages/mypage';
import { SignUp } from '@/pages/signup';
import { getAuthRepository } from '@/repositories/authRepository';
import { getColorRepository } from '@/repositories/colorRepository';
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
import { getUserService } from '@/usecases/userService';
import { get } from '@/utils/object/get';

import { useTokenContext } from './contexts/tokenContext';
import { Landing } from './pages/landing';
import { NotFoundPage } from './pages/not-found';

export const App = () => {
  const { clearToken, token } = useTokenContext();
  const [isWrongTokenDialogOpen, setWrongTokenDialogOpen] = useState(false);
  const ENV = useGuardContext(envContext);

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

    const truffleClient = getTruffleClient({
      enabled: ENV.NODE_ENV === 'production' && ENV.APP_ENV !== 'test',
      app: { name: 'snutt-webclient-v2', phase: ENV.APP_ENV },
      apiKey: ENV.TRUFFLE_API_KEY,
    });
    const snuttApiClient = getApiClient({ baseURL: ENV.API_BASE_URL, headers: { 'x-access-apikey': ENV.API_KEY } });

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

    const userService = getUserService({ repositories: [userRepository] });
    const colorService = getColorService({ repositories: [colorRepository] });
    const errorService = getErrorService({ repositories: [errorRepository], errorCaptureClient: truffleClient });
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
      timetableService,
      semesterService,
      searchService,
      notificationService,
      feedbackService,
      errorService,
      colorService,
      userService,
    };
  }, [ENV]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (get(error, ['errcode']) === 8194) setWrongTokenDialogOpen(true);
            else services.errorService.captureError(error);
          },
        }),
        defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
      }),
  );

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
};

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
