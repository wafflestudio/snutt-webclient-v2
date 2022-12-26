import styled from 'styled-components';

import { IcClose } from '@/components/icons/ic-close';
import { IcPlus } from '@/components/icons/ic-plus';
import { Tabs } from '@/components/tabs';

export const MainTimetableSection = () => {
  const mockIds = ['1'];
  return (
    <Wrapper>
      <Tabs value={'1'}>
        {mockIds.map((id) => (
          <Tabs.Tab data-testid="mt-tab" data-id={id} value={id} aria-selected>
            나의 시간표 <CloseIcon />
          </Tabs.Tab>
        ))}
        <AddIcon />
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

const CloseIcon = styled(IcClose)`
  opacity: 0.6;
  transition: opacity 0.1s;

  &:hover {
    opacity: 1;
  }
`;

const AddIcon = styled(IcPlus)`
  margin: 0 10px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.1s;

  &:hover {
    opacity: 1;
  }
`;
