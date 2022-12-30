import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from '@/components/dialog';
import { useYearSemester } from '@/hooks/useYearSemester';
import { searchService } from '@/usecases/searchService';
import { ArrayElement } from '@/utils/array-element';

import { SearchForm } from '..';
import { MainSearchbarFilterTimeSelectDialog } from './main-searchbar-filter-time-select-dialog';

type Props = {
  open: boolean;
  onClose: () => void;
  searchForm: SearchForm;
  onChangeCheckbox: <F extends 'academicYear' | 'category' | 'classification' | 'credit' | 'department' | 'etc'>(
    field: F,
    e: ArrayElement<SearchForm[F]>,
  ) => void;
  onChangeTimeRadio: (value: 'auto' | 'manual' | null) => void;
  onChangeDepartment: (value: string[]) => void;
  onChangeBitMask: (bm: number[]) => void;
};

export const MainSearchbarFilterDialog = ({
  open,
  onClose,
  searchForm,
  onChangeCheckbox,
  onChangeTimeRadio,
  onChangeBitMask,
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
                onChange={(e) => onChangeDepartment([e.target.value])}
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
              <Checkbox field="academicYear" key={y} value={y} searchForm={searchForm} onChange={onChangeCheckbox} />
            ))}
          </Row>
          <Row>
            <RowLabel>학점</RowLabel>
            {data?.credit.map((c) => (
              <Checkbox
                field="credit"
                key={c}
                label={c}
                value={Number(c.replace('학점', ''))}
                searchForm={searchForm}
                onChange={onChangeCheckbox}
              />
            ))}
          </Row>
          <Row>
            <RowLabel>구분</RowLabel>
            {data?.classification.map((c) => (
              <Checkbox field="classification" key={c} value={c} searchForm={searchForm} onChange={onChangeCheckbox} />
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
            <Checkbox field="etc" label="영어진행 강의" value="E" searchForm={searchForm} onChange={onChangeCheckbox} />
            <Checkbox
              field="etc"
              label="군휴학 원격수업"
              value="MO"
              searchForm={searchForm}
              onChange={onChangeCheckbox}
            />
          </Row>
          <Row>
            <RowLabel>시간대 검색</RowLabel>
            <label>
              시간대 검색
              <input
                type="checkbox"
                checked={searchForm.timeType !== null}
                onChange={(e) => onChangeTimeRadio(e.target.checked ? 'auto' : null)}
                data-testid="layout-searchbar-filter-dialog-form-time-check"
              />
            </label>
            <label>
              빈 시간대만 검색하기
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-radio-auto"
                type="radio"
                disabled={searchForm.timeType === null}
                checked={searchForm.timeType === 'auto'}
                onChange={() => onChangeTimeRadio('auto')}
              />
            </label>
            <label>
              시간대 직접 선택하기
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-radio-manual"
                type="radio"
                disabled={searchForm.timeType === null}
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
      <MainSearchbarFilterTimeSelectDialog
        open={isTimeModalOpen}
        onClose={() => setTimeModalOpen(false)}
        onChangeBitMask={onChangeBitMask}
      />
    </StyledDialog>
  );
};

const Checkbox = <F extends 'academicYear' | 'category' | 'classification' | 'credit' | 'department' | 'etc'>({
  value,
  label,
  searchForm,
  onChange,
  field,
  'data-testid': dataTestId,
}: {
  field: F;
  'data-testid'?: string;
  label?: string;
  value: ArrayElement<SearchForm[F]>;
  searchForm: SearchForm;
  onChange: (field: F, value: ArrayElement<SearchForm[F]>) => void;
}) => (
  <label>
    {label ?? value}
    <input
      type="checkbox"
      checked={(searchForm[field] as typeof value[]).includes(value)}
      onChange={() => onChange(field, value)}
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
