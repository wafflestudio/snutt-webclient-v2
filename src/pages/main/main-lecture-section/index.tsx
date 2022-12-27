import styled from 'styled-components';

import { Tabs } from '@/components/tabs';
import { Timetable } from '@/entities/timetable';

type Props = {
  className?: string;
  tab: 'current' | 'result';
  changeTab: (tab: 'current' | 'result') => void;
  currentTimetable: Timetable | undefined;
};

export const MainLectureSection = ({ tab, changeTab, className, currentTimetable }: Props) => {
  console.log(currentTimetable);

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
      <Content></Content>
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
