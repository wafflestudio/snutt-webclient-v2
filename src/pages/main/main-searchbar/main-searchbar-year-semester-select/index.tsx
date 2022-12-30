import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useCourseBooks } from '@/hooks/useCourseBooks';
import { useYearSemester } from '@/hooks/useYearSemester';
import { semesterService } from '@/usecases/semesterService';

export const MainSearchbarYearSemesterSelect = () => {
  const { data: courseBooks } = useCourseBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const { year, semester } = useYearSemester();

  const value = year && semester ? semesterService.courseBookToValue({ year, semester }) : 0;

  const onChangeBook = ({ year, semester }: { year: number; semester: number }) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('year', `${year}`);
    newParams.set('semester', `${semester}`);
    setSearchParams(newParams);
  };

  return (
    <Select
      data-testid="course-book-select"
      value={value}
      onChange={(e) => onChangeBook(semesterService.valueToCourseBook(e.target.value as `${number}-${1 | 2 | 3 | 4}`))}
    >
      {courseBooks?.map((cb, i) => (
        <option key={i} value={semesterService.courseBookToValue(cb)}>
          {semesterService.courseBookToLabel(cb)}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  width: 80px;
  height: 30px;
  cursor: pointer;
  border: 1px solid #888;
  border-radius: 4px;
  outline: none;
`;
