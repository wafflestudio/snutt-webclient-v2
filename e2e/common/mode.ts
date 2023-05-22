import { type Helpers } from '../utils/bdd';

export const getModeSpecs = ({ setLocalStorage }: Helpers) => ({
  Given: {
    '시간표 모드': async (role: '꽉찬' | '실제') =>
      setLocalStorage('timetable_display_mode', { 꽉찬: 'full', 실제: 'real' }[role]),
  },
});
