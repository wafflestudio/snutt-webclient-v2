import { SearchResultLecture } from '@/entities/search';
import { FullTimetable } from '@/entities/timetable';

import { MainLectureEmptyText } from '../main-lecture-empty-text';
import { MainLectureList } from '../main-lecture-list';
import { MainSearchLectureListItem } from './main-search-lecture-list-item';

type Props = {
  searchResult?: SearchResultLecture[];
  currentFullTimetable?: FullTimetable;
  setPreviewLectureId: (id: string | null) => void;
};

export const MainSearchLectureTab = ({ searchResult, currentFullTimetable, setPreviewLectureId }: Props) => {
  if (!searchResult) return null;

  if (searchResult.length === 0) return <MainLectureEmptyText>검색 결과가 없습니다.</MainLectureEmptyText>;

  return (
    <MainLectureList>
      {searchResult?.map((l) => (
        <MainSearchLectureListItem
          timetableId={currentFullTimetable?._id}
          lecture={l}
          key={l._id}
          setPreviewLectureId={setPreviewLectureId}
        />
      ))}
    </MainLectureList>
  );
};
