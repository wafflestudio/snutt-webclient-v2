import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from '@/components/dialog';

import { SearchForm } from '..';
import { MainSearchbarFilterTimeSelectDialog } from './main-searchbar-filter-time-select-dialog';

type Props = {
  open: boolean;
  onClose: () => void;
  searchForm: Partial<SearchForm>;
  onChangeSearchForm: <K extends keyof SearchForm>(key: K, value: SearchForm[K]) => void;
};

export const MainSearchbarFilterDialog = ({ open, onClose, searchForm, onChangeSearchForm }: Props) => {
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);

  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialog.Title>상세조건 설정</StyledDialog.Title>
      <StyledContent>
        여기 대충 체크박스가 엄청 많습니다
        <br />
        <br />
        <form>
          <Row>
            <label>
              시간대 검색
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-check"
                type="checkbox"
                checked={searchForm.timeChecked ?? false}
                onChange={(e) => {
                  onChangeSearchForm('timeChecked', e.target.checked);
                  onChangeSearchForm('timeType', null);
                }}
              />
            </label>
            <label>
              빈 시간대만 검색하기
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-radio-auto"
                type="radio"
                disabled={!searchForm.timeChecked}
                checked={searchForm.timeType === 'auto'}
                onChange={() => {
                  onChangeSearchForm('timeChecked', true);
                  onChangeSearchForm('timeType', 'auto');
                }}
              />
            </label>
            <label>
              시간대 직접 선택하기
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-radio-manual"
                type="radio"
                disabled={!searchForm.timeChecked}
                checked={searchForm.timeType === 'manual'}
                onChange={() => {
                  onChangeSearchForm('timeChecked', true);
                  onChangeSearchForm('timeType', 'manual');
                }}
              />
            </label>
            <button
              type="button"
              disabled={searchForm.timeType !== 'manual'}
              data-testid="layout-searchbar-filter-dialog-form-time-manual-button"
              onClick={() => setTimeModalOpen(true)}
            >
              선택창 열기
            </button>
          </Row>
        </form>
      </StyledContent>
      <MainSearchbarFilterTimeSelectDialog open={isTimeModalOpen} onClose={() => setTimeModalOpen(false)} />
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  padding: 20px 40px 40px;
  border-radius: 21px;
  max-width: 100%;
`;

const StyledContent = styled(StyledDialog.Content)`
  border-top: 1px solid #ddd;
  padding-top: 20px;
  width: 800px;
  height: 400px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;
