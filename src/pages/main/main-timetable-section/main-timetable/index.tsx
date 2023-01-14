import { useQuery } from '@tanstack/react-query';
import styled, { css, keyframes } from 'styled-components';

import { BaseLecture } from '@/entities/lecture';
import { FullTimetable } from '@/entities/timetable';
import { colorService } from '@/usecases/colorService';
import { lectureService } from '@/usecases/lectureService';

const allDays = ['월', '화', '수', '목', '금', '토', '일'];
const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

type Props = {
  timetable: FullTimetable;
  className?: string;
  hoveredLectureId: string | null;
  setHoveredLectureId: (id: string | null) => void;
  onClickLecture: (id: string) => void;
  previewLecture?: BaseLecture;
};

export const MainTimeTable = ({
  timetable,
  className,
  hoveredLectureId,
  setHoveredLectureId,
  onClickLecture,
  previewLecture,
}: Props) => {
  const { data: colorList } = useColorList();

  const maxDay = Math.max(...timetable.lecture_list.flatMap((l) => l.class_time_json).map((item) => item.day));
  const days = allDays.slice(0, Math.max(4, maxDay) + 1);

  return (
    <Wrapper className={className} $columnCount={days.length} $rowCount={times.length * 2} data-testid="main-timetable">
      {
        // 상단 월화수목금토일
        days.map((d, i) => (
          <Day $colStart={i + 2} key={d}>
            {d}
          </Day>
        ))
      }

      {
        // 좌측 8 ~ 23
        times.map((t, i) => (
          <Time $rowStart={i * 2 + 2} key={t}>
            {t}
          </Time>
        ))
      }

      {
        // 가운데 시간표 가로줄들
        times.map((_, i) => (
          <TimeLine $rowStart={i * 2 + 2} key={_} />
        ))
      }

      {timetable.lecture_list.map((lecture) => {
        if (!colorList) return;

        const { bg: backgroundColor, fg: color } = lectureService.getLectureColor(lecture, colorList);
        const isHovered = lecture._id === hoveredLectureId;

        return lecture.class_time_json.map((time) => {
          const colStart = time.day;
          const rowStart = time.start * 2 + 2;
          const rowEnd = rowStart + time.len * 2;

          return (
            <Item
              data-testid="main-timetable-lecture"
              $colStart={colStart + 2}
              $rowStart={rowStart}
              $rowEnd={rowEnd}
              $hovered={isHovered}
              key={time._id}
              style={{ backgroundColor, color }}
              onMouseEnter={() => setHoveredLectureId(lecture._id)}
              onMouseLeave={() => setHoveredLectureId(null)}
              onClick={() => onClickLecture(lecture._id)}
            >
              {lecture.course_title}
            </Item>
          );
        });
      })}

      {previewLecture?.class_time_json.map((time) => {
        const colStart = time.day;
        const rowStart = time.start * 2 + 2;
        const rowEnd = rowStart + time.len * 2;

        return (
          <Item
            data-testid="main-timetable-preview-lecture"
            $colStart={colStart + 2}
            $rowStart={rowStart}
            $rowEnd={rowEnd}
            $isPreview
            key={time._id}
          >
            {previewLecture.course_title}
          </Item>
        );
      })}
    </Wrapper>
  );
};

const useColorList = () => useQuery(['colors'], () => colorService.getColorList(), { staleTime: Infinity });

const Wrapper = styled.div<{ $columnCount: number; $rowCount: number }>`
  display: grid;
  grid-template-columns: 45px repeat(${({ $columnCount }) => $columnCount}, 1fr);
  grid-template-rows: 40px repeat(${({ $rowCount }) => $rowCount}, 20px);

  height: 100%;
`;

const Day = styled.div<{ $colStart: number }>`
  grid-column: ${({ $colStart }) => `${$colStart} / ${$colStart + 1}`};
  grid-row: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgb(232, 235, 240);
`;

const Time = styled.div<{ $rowStart: number }>`
  grid-column: 1 / 2;
  grid-row: ${({ $rowStart }) => `${$rowStart} / ${$rowStart + 1}`};
  text-align: right;
  font-size: 14px;
  opacity: 0.4;
  padding-right: 7px;
`;

const TimeLine = styled.div<{ $rowStart: number }>`
  grid-column: 2 / -1;
  grid-row: ${({ $rowStart }) => `${$rowStart + 1} / ${$rowStart + 2}`};
  border-top: 1px solid rgb(248, 249, 250);
  border-bottom: 1px solid rgb(232, 235, 240);
`;

const flash = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0.8;
  }
`;

const Item = styled.div<{
  $colStart: number;
  $rowStart: number;
  $rowEnd: number;
  $hovered?: boolean;
  $isPreview?: boolean;
}>`
  grid-column: ${({ $colStart }) => `${$colStart} / ${$colStart + 1}`};
  grid-row: ${({ $rowStart, $rowEnd }) => `${$rowStart} / ${$rowEnd}`};
  font-size: 10px;
  display: flex;
  flex-direction: column;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: filter 0.1s;
  filter: ${({ $hovered = false }) => ($hovered ? 'brightness(40%)' : 'none')};

  ${({ $isPreview = false }) =>
    $isPreview
      ? css`
          box-shadow: 0px 2px 4px #000;
          background-color: #ddd;
          animation: ${flash} 0.5s linear infinite alternate;
        `
      : 'none'};
`;
