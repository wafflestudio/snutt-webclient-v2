import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled, { css } from 'styled-components';

import { Layout } from '@/components/layout';
import { SearchFilter } from '@/entities/search';
import { useYearSemester } from '@/hooks/useYearSemester';
import { BREAKPOINT } from '@/styles/constants';
import { timetableService } from '@/usecases/timetableService';

import { MainLectureEditDialog } from './main-lecture-edit-dialog';
import { MainLectureSection } from './main-lecture-section';
import { MainSearchbar } from './main-searchbar';
import { MainTimetableSection } from './main-timetable-section';

export const Main = () => {
  const [hoveredLectureId, setHoveredLectureId] = useState<string | null>(null);
  const [dialogLectureId, setDialogLectureId] = useState<string | null>(null);
  const [lectureTab, setLectureTab] = useState<'result' | 'current'>('current');
  const [currentTimetableId, setCurrentTimetableId] = useState<string | null>(null);
  const { year, semester } = useYearSemester();
  const { data: timetables } = useMyTimetables();

  const currentYearSemesterTimetables =
    year && semester ? timetables?.filter((tt) => tt.year === year && tt.semester === semester) : undefined;
  const currentTimetable = currentTimetableId
    ? currentYearSemesterTimetables?.find((tt) => tt._id === currentTimetableId)
    : currentYearSemesterTimetables?.[0];

  const { data: currentFullTimetable } = useCurrentFullTimetable(currentTimetable?._id);

  const dialogLecture = currentFullTimetable?.lecture_list.find((tt) => tt._id === dialogLectureId);

  const onClickLecture = (id: string) => setDialogLectureId(id);

  const onSearch = (value: Partial<SearchFilter>) => {
    console.log(value); // TODO: implement
  };

  return (
    <Layout headerChildren={<MainSearchbar onSearch={onSearch} currentFullTimetable={currentFullTimetable} />}>
      <Wrapper>
        <LectureSection
          tab={lectureTab}
          changeTab={setLectureTab}
          currentFullTimetable={currentFullTimetable}
          hoveredLectureId={hoveredLectureId}
          setHoveredLectureId={setHoveredLectureId}
          onClickLecture={onClickLecture}
        />
        <TimetableSection
          currentYearSemesterTimetables={currentYearSemesterTimetables}
          currentTimetable={currentTimetable}
          currentFullTimetable={currentFullTimetable}
          changeCurrentTimetable={(id) => setCurrentTimetableId(id)}
          hoveredLectureId={hoveredLectureId}
          setHoveredLectureId={setHoveredLectureId}
          onClickLecture={onClickLecture}
        />
      </Wrapper>
      <MainLectureEditDialog
        open={dialogLectureId !== null}
        onClose={() => setDialogLectureId(null)}
        lecture={dialogLecture}
      />
    </Layout>
  );
};

const useMyTimetables = () => useQuery(['tables'], () => timetableService.getTimetables());
const useCurrentFullTimetable = (id: string | undefined) =>
  useQuery(
    ['tables', id],
    () => {
      if (!id) throw new Error();
      return timetableService.getFullTimetable(id);
    },
    { enabled: !!id },
  );

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const sectionStyle = css`
  width: 50%;
  height: 780px;
  margin: 0 auto;

  @media (max-width: ${BREAKPOINT}px) {
    width: 100%;
    max-width: 700px;
  }
`;

const LectureSection = styled(MainLectureSection)`
  ${sectionStyle};
  @media (max-width: ${BREAKPOINT}px) {
    height: 400px;
  }
`;

const TimetableSection = styled(MainTimetableSection)`
  ${sectionStyle};
  @media (max-width: ${BREAKPOINT}px) {
    margin-bottom: 30px;
  }
`;
