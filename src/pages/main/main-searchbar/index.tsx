import { FormEvent, useState } from 'react';
import styled from 'styled-components';

import { IcFilter } from '@/components/icons/ic-filter';
import { SearchFilter } from '@/entities/search';

import { MainSearchbarFilterDialog } from './main-searchbar-filter-dialog';
import { MainSearchbarYearSemesterSelect } from './main-searchbar-year-semester-select';

type Props = { onSearch: (filter: Partial<SearchFilter>) => void };
export type SearchForm = {
  title: string;
  timeType: 'auto' | 'manual' | null;
  checkboxes: string[];
  department: string;
};

export const MainSearchbar = ({ onSearch }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchForm, setSearchForm] = useState<SearchForm>({
    checkboxes: [],
    department: '',
    timeType: null,
    title: '',
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchForm);
  };

  const onChangeCheckbox = (e: string) => {
    setSearchForm((sf) => ({
      ...sf,
      checkboxes: searchForm.checkboxes.includes(e) ? sf.checkboxes.filter((c) => c !== e) : sf.checkboxes.concat(e),
    }));
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
