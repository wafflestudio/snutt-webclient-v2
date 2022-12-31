import styled from 'styled-components';

import { Tabs } from '@/components/tabs';
import { SearchResultLecture } from '@/entities/search';
import { FullTimetable } from '@/entities/timetable';

import { MainLectureListItem } from './main-lecture-list-item';

type Props = {
  className?: string;
  tab: 'current' | 'result';
  changeTab: (tab: 'current' | 'result') => void;
  currentFullTimetable: FullTimetable | undefined;
  hoveredLectureId: string | null;
  setHoveredLectureId: (id: string | null) => void;
  onClickLecture: (id: string) => void;
  searchResult?: SearchResultLecture[];
};

export const MainLectureSection = ({
  tab,
  changeTab,
  className,
  currentFullTimetable,
  hoveredLectureId,
  setHoveredLectureId,
  onClickLecture,
  searchResult,
}: Props) => {
  return (
    <Wrapper className={className}>
      <Tabs value={tab}>
        <Tabs.Tab
          data-testid="ml-result-tab"
          value="result"
          aria-selected={tab === 'result'}
          onClick={() => changeTab('result')}
        >
          검색결과
        </Tabs.Tab>
        <Tabs.Tab
          data-testid="ml-current-tab"
          value="current"
          aria-selected={tab === 'current'}
          onClick={() => changeTab('current')}
        >
          현재 시간표
        </Tabs.Tab>
      </Tabs>
      <Content>
        {tab === 'current' &&
          (!currentFullTimetable ? null : currentFullTimetable.lecture_list.length === 0 ? (
            <EmptyText>추가된 강의가 없습니다.</EmptyText>
          ) : (
            <LectureList>
              {currentFullTimetable.lecture_list.map((l) => (
                <MainLectureListItem
                  lecture={l}
                  key={l._id}
                  hoveredLectureId={hoveredLectureId}
                  setHoveredLectureId={setHoveredLectureId}
                  onClickLecture={onClickLecture}
                  type="current"
                />
              ))}
            </LectureList>
          ))}
        {tab === 'result' && (
          <LectureList>
            {!searchResult ? null : searchResult.length === 0 ? (
              <EmptyText>추가된 강의가 없습니다.</EmptyText>
            ) : (
              searchResult?.map((l) => (
                <MainLectureListItem
                  lecture={l}
                  key={l._id}
                  hoveredLectureId={hoveredLectureId}
                  setHoveredLectureId={setHoveredLectureId}
                  onClickLecture={onClickLecture}
                  type="result"
                />
              ))
            )}
          </LectureList>
        )}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 20px 15px 0;
`;

const Content = styled.div`
  background-color: #ffffff;
  height: calc(100% - 33px);
`;

const EmptyText = styled.p`
  margin: 0;
  padding: 20px 30px;
  font-size: 14px;
`;

const LectureList = styled.ul`
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: scroll;
`;
