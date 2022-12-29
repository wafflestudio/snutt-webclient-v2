import { FormEvent, useState } from 'react';
import styled from 'styled-components';

import { IcFilter } from '@/components/icons/ic-filter';
import { SearchFilter } from '@/entities/search';

import { MainSearchbarFilterDialog } from './main-searchbar-filter-dialog';
import { MainSearchbarYearSemesterSelect } from './main-searchbar-year-semester-select';

type Props = { onSearch: (filter: Partial<SearchFilter>) => void };
export type SearchForm = { title: string; timeChecked: boolean; timeType: 'auto' | 'manual' | null };

export const MainSearchbar = ({ onSearch }: Props) => {
  const [open, setOpen] = useState(false);
  const [searchForm, setSearchForm] = useState<Partial<SearchForm>>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchForm);
  };

  const onChangeSearchForm = <K extends keyof SearchForm>(key: K, value: SearchForm[K]) =>
    setSearchForm((sf) => ({ ...sf, [key]: value }));

  return (
    <Wrapper>
      <MainSearchbarYearSemesterSelect />
      <Form onSubmit={onSubmit}>
        <Input value={searchForm.title ?? ''} onChange={(e) => onChangeSearchForm('title', e.target.value)} />
      </Form>
      <FilterIcon data-testid="layout-searchbar-filter-button" onClick={() => setOpen(true)} />
      <MainSearchbarFilterDialog
        open={open}
        onClose={() => setOpen(false)}
        searchForm={searchForm}
        onChangeSearchForm={onChangeSearchForm}
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
