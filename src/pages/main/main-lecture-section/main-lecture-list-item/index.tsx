import { useState } from 'react';
import styled from 'styled-components';

import { IcClock } from '@/components/icons/ic-clock';
import { IcDots } from '@/components/icons/ic-dots';
import { IcLabel } from '@/components/icons/ic-label';
import { IcMap } from '@/components/icons/ic-map';
import { BaseLecture } from '@/entities/lecture';
import { useYearSemester } from '@/hooks/useYearSemester';
import { lectureService } from '@/usecases/lectureService';

import { MainLectureDeleteDialog } from './main-lecture-delete-dialog';

type Props = {
  timetableId?: string;
  lecture: BaseLecture;
  hoveredLectureId?: string | null;
  setHoveredLectureId?: (id: string | null) => void;
  onClickLecture?: (id: string) => void;
  type: 'current' | 'result';
};

export const MainLectureListItem = ({
  lecture,
  timetableId,
  hoveredLectureId,
  setHoveredLectureId,
  onClickLecture,
  type,
}: Props) => {
  const { year, semester } = useYearSemester();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isHovered = hoveredLectureId === lecture._id;
  const department = [lecture.department, lecture.academic_year];
  const places = lecture.class_time_json.map((t) => t.place);
  const times = lectureService.getLectureTimeTexts(lecture);
  const emptyText = '-';
  const detailUrl =
    lecture.course_number && year && semester ? lectureService.getLectureDetailUrl(lecture, { year, semester }) : null;

  const onClickAdd = () => {
    // TODO: implement
  };

  return (
    <LectureListItem
      data-testid="main-lecture-listitem"
      onMouseEnter={() => setHoveredLectureId?.(lecture._id)}
      onMouseLeave={() => setHoveredLectureId?.(null)}
      onClick={() => onClickLecture?.(lecture._id)}
      $hovered={isHovered}
      $clickable={!!onClickLecture}
    >
      <LectureInner>
        <LectureHeader>
          <LectureHeaderLeft>
            <LectureTitle data-testid="main-lecture-listitem-title">{lecture.course_title}</LectureTitle>
            <LectureInstructor data-testid="main-lecture-listitem-instructor">
              {lecture.instructor} / {lecture.credit}학점
            </LectureInstructor>
          </LectureHeaderLeft>

          <LectureHeaderRight data-testid="main-lecture-listitem-right">
            {detailUrl && (
              <LectureButton
                as="a"
                href={detailUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                data-testid="main-lecture-listitem-link"
              >
                강의계획서
              </LectureButton>
            )}
            {
              {
                current: (
                  <LectureButton
                    style={{ color: '#ff0000' }}
                    onClick={(e) => (e.stopPropagation(), setDeleteDialogOpen(true))}
                    data-testid="main-lecture-listitem-delete"
                  >
                    삭제
                  </LectureButton>
                ),
                result: (
                  <LectureButton style={{ color: '#0000ff' }} onClick={(e) => (e.stopPropagation(), onClickAdd())}>
                    추가
                  </LectureButton>
                ),
              }[type]
            }
          </LectureHeaderRight>
        </LectureHeader>

        <LectureDescription data-testid="main-lecture-listitem-department">
          <LabelIcon />
          {department.some(Boolean) ? department.join(', ') : emptyText}
        </LectureDescription>

        <LectureDescription data-testid="main-lecture-listitem-time">
          <ClockIcon />
          {times.some(Boolean) ? times.join(', ') : emptyText}
        </LectureDescription>

        <LectureDescription data-testid="main-lecture-listitem-place">
          <MapIcon />
          {places.some(Boolean) ? places.join(', ') : emptyText}
        </LectureDescription>

        {lecture.remark && (
          <LectureDescription data-testid="main-lecture-listitem-remark" style={{ fontSize: 12, opacity: 0.6 }}>
            <DotsIcon />
            {lecture.remark}
          </LectureDescription>
        )}
      </LectureInner>

      <MainLectureDeleteDialog
        lecture={lecture}
        timetableId={timetableId}
        isOpen={isDeleteDialogOpen}
        close={() => setDeleteDialogOpen(false)}
      />
    </LectureListItem>
  );
};

const LectureListItem = styled.li<{ $hovered: boolean; $clickable: boolean }>`
  list-style-type: none;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: background-color 0.1s;
  background-color: ${({ $hovered }) => ($hovered ? '#ddd' : '#fff')};
`;

const LectureInner = styled.div`
  margin: 0 30px;
  padding: 20px 0 14px;
  border-bottom: 1px solid #ebeef2;
`;

const LectureHeader = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const LectureHeaderLeft = styled.div`
  display: flex;
`;

const LectureTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
`;

const LectureInstructor = styled.div`
  margin-left: 6px;
  opacity: 0.6;
  font-size: 13px;
  line-height: 18px;
`;

const LectureHeaderRight = styled.div`
  display: flex;
  font-size: 13px;
  line-height: 18px;
`;

const LectureButton = styled.button`
  border: none;
  background-color: transparent;
  color: #000;
  opacity: 0.8;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const LectureDescription = styled.div`
  opacity: 0.8;
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 18px;
  display: flex;
`;

const LabelIcon = styled(IcLabel).attrs({ width: 14, height: 14 })`
  margin-right: 10px;
  min-width: 14px;
`;

const ClockIcon = styled(IcClock).attrs({ width: 14, height: 14 })`
  margin-right: 10px;
  min-width: 14px;
`;

const MapIcon = styled(IcMap).attrs({ width: 14, height: 14 })`
  margin-right: 10px;
  min-width: 14px;
`;

const DotsIcon = styled(IcDots).attrs({ width: 14, height: 14 })`
  margin-right: 10px;
  min-width: 14px;
`;
