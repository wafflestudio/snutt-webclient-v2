import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from '@/components/dialog';
import { useYearSemester } from '@/hooks/useYearSemester';
import { searchService } from '@/usecases/searchService';

import { SearchForm } from '..';
import { MainSearchbarFilterTimeSelectDialog } from './main-searchbar-filter-time-select-dialog';

type Props = {
  open: boolean;
  onClose: () => void;
  searchForm: Partial<SearchForm>;
  onChangeCheckbox: (value: string) => void;
  onChangeTimeRadio: (value: 'auto' | 'manual' | null) => void;
  onChangeDepartment: (value: string) => void;
};

export const MainSearchbarFilterDialog = ({
  open,
  onClose,
  searchForm,
  onChangeCheckbox,
  onChangeTimeRadio,
  onChangeDepartment,
}: Props) => {
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);
  const { data } = useSearchFilterTags();

  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialog.Title>상세조건 설정</StyledDialog.Title>
      <StyledContent>
        <form>
          <Row>
            <RowLabel>학과명 선택</RowLabel>
            <label>
              <input
                list="department"
                value={searchForm.department}
                onChange={(e) => onChangeDepartment(e.target.value)}
              />
              <datalist id="department">
                {data?.department.map((d) => (
                  <option value={d} key={d} />
                ))}
              </datalist>
            </label>
          </Row>
          <Row>
            <RowLabel>학년</RowLabel>
            {data?.academic_year.map((y) => (
              <Checkbox key={y} value={y} checkboxes={searchForm.checkboxes} onChange={onChangeCheckbox} />
            ))}
          </Row>
          <Row>
            <RowLabel>학점</RowLabel>
            {data?.credit.map((c) => (
              <Checkbox key={c} value={c} checkboxes={searchForm.checkboxes} onChange={onChangeCheckbox} />
            ))}
          </Row>
          <Row>
            <RowLabel>구분</RowLabel>
            {data?.classification.map((c) => (
              <Checkbox key={c} value={c} checkboxes={searchForm.checkboxes} onChange={onChangeCheckbox} />
            ))}
          </Row>
          <Row>
            <RowLabel>학문의 기초</RowLabel>
          </Row>
          <Row>
            <RowLabel>학문의 세계</RowLabel>
          </Row>
          <Row>
            <RowLabel>선택 교양</RowLabel>
          </Row>
          <Row>
            <RowLabel>기타</RowLabel>
            <Checkbox value="영어진행 강의" checkboxes={searchForm.checkboxes} onChange={onChangeCheckbox} />
            <Checkbox value="군휴학 원격수업" checkboxes={searchForm.checkboxes} onChange={onChangeCheckbox} />
          </Row>
          <Row>
            <RowLabel>시간대 검색</RowLabel>
            <Checkbox
              data-testid="layout-searchbar-filter-dialog-form-time-check"
              value="시간대 검색"
              checkboxes={searchForm.checkboxes}
              onChange={(e) => {
                onChangeCheckbox(e);
                onChangeTimeRadio(null);
              }}
            />
            <label>
              빈 시간대만 검색하기
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-radio-auto"
                type="radio"
                disabled={!searchForm.checkboxes?.includes('시간대 검색')}
                checked={searchForm.timeType === 'auto'}
                onChange={() => onChangeTimeRadio('auto')}
              />
            </label>
            <label>
              시간대 직접 선택하기
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-radio-manual"
                type="radio"
                disabled={!searchForm.checkboxes?.includes('시간대 검색')}
                checked={searchForm.timeType === 'manual'}
                onChange={() => onChangeTimeRadio('manual')}
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

const Checkbox = ({
  value,
  checkboxes,
  onChange,

  'data-testid': dataTestId,
}: {
  'data-testid'?: string;
  value: string;
  checkboxes?: string[];
  onChange: (value: string) => void;
}) => (
  <label>
    {value}
    <input
      type="checkbox"
      checked={checkboxes?.includes(value)}
      onChange={() => onChange(value)}
      data-testid={dataTestId}
    />
  </label>
);

const useSearchFilterTags = () => {
  const { year, semester } = useYearSemester();
  return useQuery(
    ['tags', year, semester],
    () => {
      if (!year || !semester) throw Error();
      return searchService.getTags({ year, semester });
    },
    { enabled: !!(year && semester) },
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
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const RowLabel = styled.div`
  width: 100px;
`;
