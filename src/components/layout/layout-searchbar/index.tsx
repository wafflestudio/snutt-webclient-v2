import { useState } from 'react';
import styled from 'styled-components';

import { IcFilter } from '@/components/icons/ic-filter';

import { LayoutSearchbarFilterDialog } from './layout-searchbar-filter-dialog';

export const LayoutSearchbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      <FilterIcon data-testid="layout-searchbar-filter-button" onClick={() => setOpen(true)} />
      <LayoutSearchbarFilterDialog open={open} onClose={() => setOpen(false)} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 30px;
`;

const FilterIcon = styled(IcFilter)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
