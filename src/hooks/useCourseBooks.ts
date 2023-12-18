import { useQuery } from '@tanstack/react-query';

import { semesterService } from '@/services';

export const useCourseBooks = () =>
  useQuery({ queryKey: ['course_books'], queryFn: () => semesterService.getCourseBooks(), staleTime: Infinity });
