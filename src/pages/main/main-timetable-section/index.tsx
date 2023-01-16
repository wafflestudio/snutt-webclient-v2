import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcClose } from '@/components/icons/ic-close';
import { IcPlus } from '@/components/icons/ic-plus';
import { Tabs } from '@/components/tabs';
import { useTokenContext } from '@/contexts/tokenContext';
import { BaseLecture } from '@/entities/lecture';
import { FullTimetable, Timetable } from '@/entities/timetable';

import { MainSectionEmptyWrapper } from '../main-section-empty-wrapper';
import { MainCreateTimetableDialog } from './main-create-timetable-dialog';
import { MainDeleteTimetableDialog } from './main-delete-timetable-dialog';
import { MainNoTimetable } from './main-no-timetable';
import { MainTimeTable } from './main-timetable';

type Props = {
  className?: string;
  currentYearSemesterTimetables: Timetable[] | undefined;
  currentFullTimetable: FullTimetable | undefined;
  currentTimetable: Timetable | undefined;
  changeCurrentTimetable: (id: string) => void;
  hoveredLectureId: string | null;
  setHoveredLectureId: (id: string | null) => void;
  onClickLecture: (id: string) => void;
  setCurrentTimetable: (id: string | null) => void;
  previewLecture?: BaseLecture;
};

export const MainTimetableSection = ({
  className,
  currentTimetable,
  currentFullTimetable,
  currentYearSemesterTimetables,
  changeCurrentTimetable,
  hoveredLectureId,
  setHoveredLectureId,
  onClickLecture,
  previewLecture,
  setCurrentTimetable,
}: Props) => {
  const { token } = useTokenContext();
  const navigate = useNavigate();
  const [isCreateTimetableDialogOpen, setCreateTimetableDialogOpen] = useState(false);
  const [deleteTimetableDialogId, setDeleteTimetableDialogId] = useState<string | null>(null);

  const isLoggedIn = !!token;

  const onClickCreate = () => {
    if (isLoggedIn) setCreateTimetableDialogOpen(true);
    else navigate('/login');
  };

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
            {title} <CloseIcon data-testid="mt-tab-delete" onClick={() => setDeleteTimetableDialogId(id)} />
          </Tabs.Tab>
        ))}
        <AddIcon data-testid="mt-create-timetable" onClick={onClickCreate} />
      </Tabs>
      <Content>
        {isLoggedIn ? (
          currentYearSemesterTimetables &&
          (currentYearSemesterTimetables.length > 0 ? (
            currentFullTimetable && (
              <MainTimeTable
                timetable={currentFullTimetable}
                previewLecture={previewLecture}
                hoveredLectureId={hoveredLectureId}
                setHoveredLectureId={setHoveredLectureId}
                onClickLecture={onClickLecture}
              />
            )
          ) : (
            <NoTimetable onClickCreate={() => setCreateTimetableDialogOpen(true)} />
          ))
        ) : (
          <MainSectionEmptyWrapper>로그인하면 시간표를 이용할 수 있어요</MainSectionEmptyWrapper>
        )}
      </Content>
      <MainCreateTimetableDialog
        isOpen={isCreateTimetableDialogOpen}
        close={() => setCreateTimetableDialogOpen(false)}
        setCurrentTimetable={setCurrentTimetable}
      />
      <MainDeleteTimetableDialog
        isOpen={deleteTimetableDialogId !== null}
        close={() => setDeleteTimetableDialogId(null)}
        timetable={currentFullTimetable}
        onDelete={() => setCurrentTimetable(null)}
      />
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
  height: 32px;

  &:hover {
    opacity: 1;
  }
`;

const NoTimetable = styled(MainNoTimetable)`
  height: 100%;
`;
