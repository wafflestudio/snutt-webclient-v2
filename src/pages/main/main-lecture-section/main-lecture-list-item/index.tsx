import styled from 'styled-components';

import { Lecture } from '@/entities/lecture';

type Props = { lecture: Lecture; hoveredLectureId: string | null; setHoveredLectureId: (id: string | null) => void };

export const MainLectureListItem = ({ lecture, hoveredLectureId, setHoveredLectureId }: Props) => {
  const isHovered = hoveredLectureId === lecture._id;

  return (
    <LectureListItem
      data-testid="main-lecture-listitem"
      onMouseEnter={() => setHoveredLectureId(lecture._id)}
      onMouseLeave={() => setHoveredLectureId(null)}
      $hovered={isHovered}
    >
      <LectureInner>
        <LectureHeader>
          <LectureHeaderLeft>
            <LectureTitle data-testid="main-lecture-listitem-title">{lecture.course_title}</LectureTitle>
            <LectureInstructor data-testid="main-lecture-listitem-instructor">
              {lecture.instructor} / {lecture.credit}학점
            </LectureInstructor>
          </LectureHeaderLeft>
          <LectureNumber data-testid="main-lecture-listitem-number">
            {lecture.course_number} / {lecture.lecture_number}
          </LectureNumber>
        </LectureHeader>
        <LectureDepartment data-testid="main-lecture-listitem-department">
          {lecture.department}, {lecture.academic_year}
        </LectureDepartment>
        <LectureTime data-testid="main-lecture-listitem-time">{lecture.real_class_time}</LectureTime>
        {lecture.remark && <LectureNotice>{lecture.remark}</LectureNotice>}
      </LectureInner>
    </LectureListItem>
  );
};

const LectureListItem = styled.li<{ $hovered: boolean }>`
  list-style-type: none;
  cursor: pointer;
  transition: background-color 0.1s;
  background-color: ${({ $hovered }) => ($hovered ? '#bbb' : '#fff')};
`;

const LectureInner = styled.div`
  margin: 0 30px;
  padding: 20px 0 14px;
  border-bottom: 1px solid #ebeef2;
`;

const LectureHeader = styled.div`
  justify-content: space-between;
  display: flex;
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

const LectureNumber = styled.div`
  opacity: 0.4;
  font-size: 13px;
  line-height: 18px;
`;

const LectureDepartment = styled.div`
  opacity: 0.8;
  margin: 10px 0 5px;
  font-size: 14px;
`;

const LectureTime = styled.div`
  opacity: 0.8;
  font-size: 14px;
`;

const LectureNotice = styled.div`
  margin-top: 14px;
  font-size: 13px;
  font-style: italic;
  opacity: 0.6;
`;
