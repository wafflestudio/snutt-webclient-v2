import { useState } from 'react';
import styled, { css } from 'styled-components';

import { Layout } from '@/components/layout';
import { BREAKPOINT } from '@/styles/constants';

import { MainLectureSection } from './main-lecture-section';
import { MainTimetableSection } from './main-timetable-section';

export const Main = () => {
  const [lectureTab, setLectureTab] = useState<'result' | 'current'>('current');

  return (
    <Layout>
      <Wrapper>
        <LectureSection tab={lectureTab} changeTab={setLectureTab} />
        <TimetableSections />
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const sectionStyle = css`
  width: 50%;
  height: 745px;
  margin: 0 auto;

  @media (max-width: ${BREAKPOINT}px) {
    width: 100%;
    max-width: 700px;
    height: 400px;
  }
`;

const LectureSection = styled(MainLectureSection)`
  ${sectionStyle};
`;

const TimetableSections = styled(MainTimetableSection)`
  ${sectionStyle};
`;
