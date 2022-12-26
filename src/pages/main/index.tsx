import { useState } from 'react';

import { Layout } from '@/components/layout';
import { Tabs } from '@/components/tabs';

export const Main = () => {
  const [lectureTab, setLectureTab] = useState<'result' | 'current'>('current');

  return (
    <Layout>
      <Tabs value={lectureTab}>
        <Tabs.Tab
          data-testid="ml-result-tab"
          value="result"
          aria-selected={lectureTab === 'result'}
          onClick={() => setLectureTab('result')}
        >
          검색결과
        </Tabs.Tab>
        <Tabs.Tab
          data-testid="ml-current-tab"
          value="current"
          aria-selected={lectureTab === 'current'}
          onClick={() => setLectureTab('current')}
        >
          현재 시간표
        </Tabs.Tab>
      </Tabs>
    </Layout>
  );
};
