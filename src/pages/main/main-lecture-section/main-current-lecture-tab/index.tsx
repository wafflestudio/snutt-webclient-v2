import { Loader } from '@/components/loader';
import { FullTimetable, Timetable } from '@/entities/timetable';

import { MainLectureEmptyWrapper } from '../main-lecture-empty-wrapper';
import { MainLectureList } from '../main-lecture-list';
import { MainCurrentLectureListItem } from './main-current-lecture-list-item';

type Props = {
  currentYearSemesterTimetables?: Timetable[];
  currentFullTimetable: FullTimetable | undefined;
  hoveredLectureId: string | null;
  setHoveredLectureId: (id: string | null) => void;
  onClickLecture: (id: string) => void;
};

export const MainCurrentLectureTab = ({
  currentYearSemesterTimetables,
  currentFullTimetable,
  onClickLecture,
  hoveredLectureId,
  setHoveredLectureId,
}: Props) => {
  if (currentYearSemesterTimetables && currentYearSemesterTimetables.length === 0)
    return <MainLectureEmptyWrapper data-testid="ml-current-no-timetable">시간표가 없습니다.</MainLectureEmptyWrapper>;

  if (!currentFullTimetable || !currentYearSemesterTimetables)
    return (
      <MainLectureEmptyWrapper>
        <Loader />
      </MainLectureEmptyWrapper>
    );

  if (currentFullTimetable.lecture_list.length === 0)
    return (
      <MainLectureEmptyWrapper data-testid="ml-current-no-lecture">추가된 강의가 없습니다.</MainLectureEmptyWrapper>
    );

  return (
    <MainLectureList>
      {currentFullTimetable.lecture_list.map((l) => (
        <MainCurrentLectureListItem
          timetableId={currentFullTimetable?._id}
          lecture={l}
          key={l._id}
          hoveredLectureId={hoveredLectureId}
          setHoveredLectureId={setHoveredLectureId}
          onClickLecture={onClickLecture}
        />
      ))}
    </MainLectureList>
  );
};
