import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { getStorageClient } from '@/clients/storage';
import { truffleClient } from '@/clients/truffle';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { serviceContext } from '@/contexts/ServiceContext';
import { ErrorPage } from '@/pages/error';
import { Main } from '@/pages/main';
import { MyPage } from '@/pages/mypage';
import { SignUp } from '@/pages/signup';
import { getStorageRepository } from '@/repositories/storageRepository';
import { getHourMinutePickerService } from '@/usecases/hourMinutePickerService';
import { getHourMinuteService } from '@/usecases/hourMinuteService';
import { getLectureService } from '@/usecases/lectureService';
import { getTimeMaskService } from '@/usecases/timeMaskService';
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
    const storageRepository = getStorageRepository({ clients: [persistStorage, temporaryStorage] });

    const lectureService = getLectureService();
    const timeMaskService = getTimeMaskService();
    const hourMinuteService = getHourMinuteService();
    const hourMinutePickerService = getHourMinutePickerService({ services: [hourMinuteService] });
    const timetableViewService = getTimetableViewService({ repositories: [storageRepository] });

    return { lectureService, timeMaskService, hourMinutePickerService, hourMinuteService, timetableViewService };
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
