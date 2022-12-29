import { Semester } from './semester';

type BitMask = number;

export type SearchFilter = { timeMask: BitMask[]; title: string; year: number; semester: Semester };
