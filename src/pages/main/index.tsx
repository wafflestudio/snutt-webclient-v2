import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled, { css } from 'styled-components';

import { Layout } from '@/components/layout';
import { useTokenContext } from '@/contexts/tokenContext';
import { SearchFilter } from '@/entities/search';
import { useYearSemester } from '@/hooks/useYearSemester';
import { BREAKPOINT } from '@/styles/constants';
import { searchService } from '@/usecases/searchService';
import { timetableService } from '@/usecases/timetableService';
import { queryKey } from '@/utils/query-key-factory';

import { MainLectureCreateDialog } from './main-lecture-create-dialog';
import { MainLectureEditDialog } from './main-lecture-edit-dialog';
import { MainLectureSection } from './main-lecture-section';
import { MainSearchbar } from './main-searchbar';
import { MainTimetableSection } from './main-timetable-section';

export const Main = () => {
  const { token } = useTokenContext();
  const [hoveredLectureId, setHoveredLectureId] = useState<string | null>(null);
  const [previewLectureId, setPreviewLectureId] = useState<string | null>(null);
  const [dialogLectureId, setDialogLectureId] = useState<string | null>(null);
  const [isCreateLectureDialog, setCreateLectureDialog] = useState(false);
  const [lectureTab, setLectureTab] = useState<'result' | 'current'>(token ? 'current' : 'result');
  const [currentTimetableId, setCurrentTimetableId] = useState<string | null>(null);
  const { year, semester } = useYearSemester();
  const { data: timetables } = useMyTimetables();

  const currentYearSemesterTimetables =
    year && semester ? timetables?.filter((tt) => tt.year === year && tt.semester === semester) : undefined;
  const currentTimetable = currentTimetableId
    ? currentYearSemesterTimetables?.find((tt) => tt._id === currentTimetableId)
    : currentYearSemesterTimetables?.[0];

  const { data: currentFullTimetable } = useCurrentFullTimetable(currentTimetable?._id);

  const { mutate, data: searchResult, reset } = useSearchResult();

  const dialogLecture = currentFullTimetable?.lecture_list.find((tt) => tt._id === dialogLectureId);
  const previewLecture = searchResult?.find((item) => item._id === previewLectureId);

  const onClickLecture = (id: string) => setDialogLectureId(id);

  const onSearch = async (value: Partial<SearchFilter>) => {
    setLectureTab('result');
    mutate(value);
  };

  return (
    <Layout
      headerChildren={
        <MainSearchbar onSearch={onSearch} currentFullTimetable={currentFullTimetable} resetSearchResult={reset} />
      }
    >
      <Wrapper>
        <LectureSection
          currentYearSemesterTimetables={currentYearSemesterTimetables}
          tab={lectureTab}
          changeTab={setLectureTab}
          previewLectureId={previewLectureId}
          currentFullTimetable={currentFullTimetable}
          hoveredLectureId={hoveredLectureId}
          setHoveredLectureId={setHoveredLectureId}
          onClickLecture={onClickLecture}
          searchResult={searchResult}
          setPreviewLectureId={setPreviewLectureId}
        />
        <TimetableSection
          currentYearSemesterTimetables={currentYearSemesterTimetables}
          currentTimetable={currentTimetable}
          currentFullTimetable={currentFullTimetable}
          previewLecture={previewLecture}
          changeCurrentTimetable={(id) => setCurrentTimetableId(id)}
          hoveredLectureId={hoveredLectureId}
          setHoveredLectureId={setHoveredLectureId}
          onClickLecture={onClickLecture}
          setCurrentTimetable={(id) => setCurrentTimetableId(id)}
          openCreateLectureDialog={() => setCreateLectureDialog(true)}
        />
      </Wrapper>
      <MainLectureEditDialog
        timetableId={currentFullTimetable?._id}
        open={dialogLectureId !== null}
        onClose={() => setDialogLectureId(null)}
        lecture={dialogLecture}
      />
      <MainLectureCreateDialog
        open={isCreateLectureDialog}
        onClose={() => setCreateLectureDialog(false)}
        timetableId={currentFullTimetable?._id}
      />
    </Layout>
  );
};

const useMyTimetables = () => {
  const { token } = useTokenContext();

  return useQuery(
    queryKey('tables', { token }),
    () => {
      if (!token) throw Error('no token');
      return timetableService.getTimetables(token);
    },
    { enabled: !!token },
  );
};

const useCurrentFullTimetable = (id: string | undefined) => {
  const { token } = useTokenContext();

  return useQuery(
    queryKey(`tables/${id}`, { token }),
    () => {
      if (!id || !token) throw new Error('no id | token');
      return timetableService.getFullTimetable(token, id);
    },
    { enabled: !!id && !!token },
  );
};

const useSearchResult = () => {
  return useMutation(['search_query'], (value: Partial<SearchFilter>) => searchService.search(value));
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

const sectionStyle = css`
  width: 50%;
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
