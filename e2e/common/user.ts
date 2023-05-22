import { type Helpers } from '../utils/bdd';

export const getUserSpecs = ({ setLocalStorage }: Helpers) => ({
  Given: {
    사용자: (role: '임시' | '로컬' | '페이스북' | '로컬 페이스북' | '오류') =>
      setLocalStorage(
        'snutt_token',
        { 임시: 'temp', 로컬: 'local', 페이스북: 'fb', '로컬 페이스북': 'local_fb', 오류: 'wrong' }[role],
      ),
  },
});
