import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled, { css } from 'styled-components';

import { Layout } from '@/components/layout';
import { useYearSemester } from '@/hooks/useYearSemester';
import { BREAKPOINT } from '@/styles/constants';
import { timetableService } from '@/usecases/timetableService';

import { MainLectureSection } from './main-lecture-section';
import { MainTimetableSection } from './main-timetable-section';

export const Main = () => {
  const [lectureTab, setLectureTab] = useState<'result' | 'current'>('current');
  const [currentTimetableId, setCurrentTimetableId] = useState<string | null>(null);
  const { year, semester } = useYearSemester();
  const { data: timetables } = useMyTimetables();

  const currentYearSemesterTimetables =
    year && semester ? timetables?.filter((tt) => tt.year === year && tt.semester === semester) : undefined;

  const currentTimetable = currentTimetableId
    ? currentYearSemesterTimetables?.find((tt) => tt._id === currentTimetableId)
    : currentYearSemesterTimetables?.[0];

  return (
    <Layout>
      <Wrapper>
        <LectureSection tab={lectureTab} changeTab={setLectureTab} currentTimetable={currentTimetable} />
        <TimetableSections
          currentYearSemesterTimetables={currentYearSemesterTimetables}
          currentTimetable={currentTimetable}
          changeCurrentTimetable={(id) => setCurrentTimetableId(id)}
        />
      </Wrapper>
    </Layout>
  );
};

const useMyTimetables = () => useQuery(['tables'], () => timetableService.getTimetables());

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
