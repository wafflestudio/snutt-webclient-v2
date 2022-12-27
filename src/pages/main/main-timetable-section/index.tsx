import styled from 'styled-components';

import { IcClose } from '@/components/icons/ic-close';
import { IcPlus } from '@/components/icons/ic-plus';
import { Tabs } from '@/components/tabs';
import { FullTimetable, Timetable } from '@/entities/timetable';

type Props = {
  className?: string;
  currentYearSemesterTimetables: Timetable[] | undefined;
  currentFullTimetable: FullTimetable | undefined;
  currentTimetable: Timetable | undefined;
  changeCurrentTimetable: (id: string) => void;
};

export const MainTimetableSection = ({
  className,
  currentTimetable,
  currentFullTimetable,
  currentYearSemesterTimetables,
  changeCurrentTimetable,
}: Props) => {
  console.log(currentFullTimetable);

  return (
    <Wrapper className={className}>
      <Tabs value={currentTimetable?._id}>
        {currentYearSemesterTimetables?.map(({ _id: id, title }) => (
          <Tabs.Tab
            data-testid="mt-tab"
            data-id={id}
            value={id}
            aria-selected={id === currentTimetable?._id}
            key={id}
            onClick={() => changeCurrentTimetable(id)}
          >
            {title} <CloseIcon />
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
  height: calc(100% - 33px);
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
