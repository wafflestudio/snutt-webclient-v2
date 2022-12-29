import { useState } from 'react';
import styled from 'styled-components';

import { IcFilter } from '@/components/icons/ic-filter';

import { MainSearchbarFilterDialog } from './main-searchbar-filter-dialog';
import { MainSearchbarYearSemesterSelect } from './main-searchbar-year-semester-select';

export const MainSearchbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <MainSearchbarYearSemesterSelect />
      <Input />
      <FilterIcon data-testid="layout-searchbar-filter-button" onClick={() => setOpen(true)} />
      <MainSearchbarFilterDialog open={open} onClose={() => setOpen(false)} />
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

const Input = styled.input`
  flex-grow: 1;
`;
