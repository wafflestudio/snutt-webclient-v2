import { useIsMutating } from '@tanstack/react-query';

import { Loader } from '@/components/loader';
import { SearchResultLecture } from '@/entities/search';
import { FullTimetable } from '@/entities/timetable';

import { MainLectureEmptyWrapper } from '../main-lecture-empty-wrapper';
import { MainLectureList } from '../main-lecture-list';
import { MainSearchLectureListItem } from './main-search-lecture-list-item';

type Props = {
  searchResult?: SearchResultLecture[];
  currentFullTimetable?: FullTimetable;
  previewLectureId: string | null;
  setPreviewLectureId: (id: string | null) => void;
};

export const MainSearchLectureTab = ({
  searchResult,
  currentFullTimetable,
  setPreviewLectureId,
  previewLectureId,
}: Props) => {
  const isSearchResultMutating = useIsMutating(['search_query']);

  if (isSearchResultMutating)
    return (
      <MainLectureEmptyWrapper>
        <Loader data-testid="ml-search-loader" />
      </MainLectureEmptyWrapper>
    );

  if (!searchResult) return <MainLectureEmptyWrapper>강의를 검색하세요</MainLectureEmptyWrapper>;

  if (searchResult.length === 0) return <MainLectureEmptyWrapper>검색 결과가 없습니다.</MainLectureEmptyWrapper>;

  return (
    <MainLectureList>
      {searchResult?.map((l) => (
        <MainSearchLectureListItem
          timetableId={currentFullTimetable?._id}
          previewLectureId={previewLectureId}
          lecture={l}
          key={l._id}
          setPreviewLectureId={setPreviewLectureId}
        />
      ))}
    </MainLectureList>
  );
};
