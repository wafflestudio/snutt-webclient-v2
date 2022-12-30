import { FormEvent, useState } from 'react';
import styled from 'styled-components';

import { IcFilter } from '@/components/icons/ic-filter';
import { SearchFilter } from '@/entities/search';
import { FullTimetable } from '@/entities/timetable';
import { useYearSemester } from '@/hooks/useYearSemester';
import { timeMaskService } from '@/usecases/timeMaskService';
import { ArrayElement } from '@/utils/array-element';

import { MainSearchbarFilterDialog } from './main-searchbar-filter-dialog';
import { MainSearchbarYearSemesterSelect } from './main-searchbar-year-semester-select';

type Props = { onSearch: (filter: Partial<SearchFilter>) => void; currentFullTimetable?: FullTimetable };

export type SearchForm = {
  title: SearchFilter['title'];
  academicYear: SearchFilter['academicYear'];
  category: SearchFilter['category'];
  credit: SearchFilter['credit'];
  etc: SearchFilter['etc'];
  classification: SearchFilter['classification'];
  department: SearchFilter['department'];
  manualBitmask: number[];
  timeType: 'auto' | 'manual' | null;
};

const initialForm = {
  academicYear: [],
  credit: [],
  etc: [],
  category: [],
  classification: [],
  department: [],
  timeType: null,
  title: '',
  manualBitmask: [],
};

export const MainSearchbar = ({ onSearch, currentFullTimetable }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchForm, setSearchForm] = useState<SearchForm>(initialForm);
  const { year, semester } = useYearSemester();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!year || !semester) return;

    const undefinedIfEmpty = <T,>(e: T[]) => (e.length === 0 ? undefined : e);

    onSearch({
      academicYear: undefinedIfEmpty(searchForm.academicYear),
      category: undefinedIfEmpty(searchForm.category),
      classification: undefinedIfEmpty(searchForm.classification),
      credit: undefinedIfEmpty(searchForm.credit),
      department: undefinedIfEmpty(searchForm.department),
      etc: undefinedIfEmpty(searchForm.etc),
      year,
      semester,
      title: searchForm.title,
      timeMask:
        searchForm.timeType === 'manual'
          ? searchForm.manualBitmask
          : searchForm.timeType === 'auto'
          ? timeMaskService.getTimetableEmptyTimeBitMask(currentFullTimetable)
          : undefined,
    });
  };

  const onChangeBitMask = (manualBitmask: number[]) => setSearchForm((sf) => ({ ...sf, manualBitmask }));

  const onChangeCheckbox = <F extends 'academicYear' | 'category' | 'classification' | 'credit' | 'department' | 'etc'>(
    field: F,
    e: ArrayElement<SearchForm[F]>,
  ) => {
    setSearchForm((sf) => {
      const org = sf[field] as typeof e[];
      return {
        ...sf,
        [field]: org.includes(e) ? org.filter((c) => c !== e) : org.concat(e),
      };
    });
  };

  return (
    <Wrapper>
      <MainSearchbarYearSemesterSelect />
      <Form onSubmit={onSubmit}>
        <Input
          value={searchForm.title ?? ''}
          onChange={(e) => setSearchForm((sf) => ({ ...sf, title: e.target.value }))}
        />
      </Form>
      <FilterIcon data-testid="layout-searchbar-filter-button" onClick={() => setOpen(true)} />
      <MainSearchbarFilterDialog
        open={open}
        onClose={() => setOpen(false)}
        searchForm={searchForm}
        onChangeCheckbox={onChangeCheckbox}
        onChangeDepartment={(department) => setSearchForm((sf) => ({ ...sf, department }))}
        onChangeTimeRadio={(timeType) => setSearchForm((sf) => ({ ...sf, timeType }))}
        onChangeBitMask={onChangeBitMask}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FilterIcon = styled(IcFilter)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Form = styled.form`
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
`;
