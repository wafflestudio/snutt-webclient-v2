import { Semester } from './semester';

type BitMask = number;

export type SearchFilter = {
  timeMask: BitMask[];
  title: string;
  year: number;
  semester: Semester;
  academicYear: string[];
  category: string[];
  credit: number[];
  department: string[];
  classification: string[];
  etc: ('MO' | 'E')[];
};
