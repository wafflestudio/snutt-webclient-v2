import { FullTimetable, Timetable } from '@/entities/timetable';

import { MainLectureEmptyText } from '../main-lecture-empty-text';
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
    return <MainLectureEmptyText data-testid="ml-current-no-timetable">시간표가 없습니다.</MainLectureEmptyText>;

  if (!currentFullTimetable || !currentYearSemesterTimetables) return null;

  if (currentFullTimetable.lecture_list.length === 0)
    return <MainLectureEmptyText data-testid="ml-current-no-lecture">추가된 강의가 없습니다.</MainLectureEmptyText>;

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
