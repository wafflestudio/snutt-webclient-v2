import { useSearchParams } from 'react-router-dom';

import { useCourseBooks } from '@/hooks/useCourseBooks';
import { useYearSemester } from '@/hooks/useYearSemester';
import { semesterService } from '@/usecases/semesterService';

export const LayoutYearSemesterSelect = () => {
  const { data: courseBooks } = useCourseBooks();
  const [searchParams, setSearchParams] = useSearchParams();
  const { year, semester } = useYearSemester();

  if (!year || !semester) return null;

  const onChangeBook = ({ year, semester }: { year: number; semester: number }) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('year', `${year}`);
    newParams.set('semester', `${semester}`);
    setSearchParams(newParams);
  };

  return (
    <select
      data-testid="course-book-select"
      value={semesterService.courseBookToValue({ year, semester })}
      onChange={(e) => onChangeBook(semesterService.valueToCourseBook(e.target.value as `${number}-${1 | 2 | 3 | 4}`))}
    >
      {courseBooks?.map((cb, i) => (
        <option key={i} value={semesterService.courseBookToValue(cb)}>
          {semesterService.courseBookToLabel(cb)}
        </option>
      ))}
    </select>
  );
};
