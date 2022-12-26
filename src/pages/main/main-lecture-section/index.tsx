import styled from 'styled-components';

import { Tabs } from '@/components/tabs';

type Props = { tab: 'current' | 'result'; changeTab: (tab: 'current' | 'result') => void };

export const MainLectureSection = ({ tab, changeTab }: Props) => {
  return (
    <Wrapper>
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
  min-height: 400px;
`;
