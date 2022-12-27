import { useQuery } from '@tanstack/react-query';

import { semesterService } from '@/usecases/semesterService';

export const useCourseBooks = () =>
  useQuery(['course_books'], () => semesterService.getCourseBooks(), { staleTime: Infinity });
