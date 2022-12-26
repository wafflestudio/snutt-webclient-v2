import { useState } from 'react';

import { Layout } from '@/components/layout';

import { MainLectureSection } from './main-lecture-section';
import { MainTimetableSection } from './main-timetable-section';

export const Main = () => {
  const [lectureTab, setLectureTab] = useState<'result' | 'current'>('current');

  return (
    <Layout>
      <MainLectureSection tab={lectureTab} changeTab={setLectureTab} />
      <MainTimetableSection />
    </Layout>
  );
};
