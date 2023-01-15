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
  onSubmit: () => void;
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
  onSubmit,
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
            <RowContent>
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
            </RowContent>
          </Row>
          <Row>
            <RowLabel>학년</RowLabel>
            <RowContent>
              {data?.academic_year.map((y) => (
                <Checkbox field="academicYear" key={y} value={y} searchForm={searchForm} onChange={onChangeCheckbox} />
              ))}
            </RowContent>
          </Row>
          <Row>
            <RowLabel>학점</RowLabel>
            <RowContent>
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
            </RowContent>
          </Row>
          <Row>
            <RowLabel>구분</RowLabel>
            <RowContent>
              {data?.classification.map((c) => (
                <Checkbox
                  field="classification"
                  key={c}
                  value={c}
                  searchForm={searchForm}
                  onChange={onChangeCheckbox}
                />
              ))}
            </RowContent>
          </Row>
          <Row>
            <RowLabel>학문의 기초</RowLabel>
            <RowContent>
              {data?.category
                .filter((c) =>
                  ['사고와 표현', '외국어', '수량적 분석과 추론', '과학적 사고와 실험', '컴퓨터와 정보 활용'].includes(
                    c,
                  ),
                )
                .map((c) => (
                  <Checkbox field="category" key={c} value={c} searchForm={searchForm} onChange={onChangeCheckbox} />
                ))}
            </RowContent>
          </Row>
          <Row>
            <RowLabel>학문의 세계</RowLabel>
            <RowContent>
              {data?.category
                .filter((c) =>
                  [
                    '언어와 문학',
                    '문화와 예술',
                    '역사와 철학',
                    '정치와 경제',
                    '인간과 사회',
                    '자연과 기술',
                    '생명과 환경',
                  ].includes(c),
                )
                .map((c) => (
                  <Checkbox field="category" key={c} value={c} searchForm={searchForm} onChange={onChangeCheckbox} />
                ))}
            </RowContent>
          </Row>
          <Row>
            <RowLabel>선택 교양</RowLabel>
            <RowContent>
              {data?.category
                .filter((c) => ['체육', '예술실기', '대학과 리더십', '창의와 융합', '한국의 이해'].includes(c))
                .map((c) => (
                  <Checkbox field="category" key={c} value={c} searchForm={searchForm} onChange={onChangeCheckbox} />
                ))}
            </RowContent>
          </Row>
          <Row>
            <RowLabel>기타</RowLabel>
            <RowContent>
              <Checkbox
                field="etc"
                label="영어진행 강의"
                value="E"
                searchForm={searchForm}
                onChange={onChangeCheckbox}
              />
              <Checkbox
                field="etc"
                label="군휴학 원격수업"
                value="MO"
                searchForm={searchForm}
                onChange={onChangeCheckbox}
              />
            </RowContent>
          </Row>
          <Row>
            <RowLabel>시간대 검색</RowLabel>
            <RowContent>
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
            </RowContent>
          </Row>
        </form>
      </StyledContent>
      <button
        data-testid="main-searchbar-filter-dialog-submit"
        type="submit"
        onClick={() => {
          onSubmit();
          onClose();
        }}
      >
        검색하기
      </button>
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
    { enabled: !!(year && semester), staleTime: Infinity },
  );
};

const StyledDialog = styled(Dialog)`
  padding: 20px 40px 40px;
  border-radius: 21px;
  max-width: 100%;
  max-height: calc(100vh - 60px);
`;

const StyledContent = styled(StyledDialog.Content)`
  border-top: 1px solid #ddd;
  padding-top: 20px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 16px;
  font-size: 14px;
`;

const RowLabel = styled.div`
  width: 100px;
  min-width: 100px;
  opacity: 0.6;
  font-weight: 700;
  line-height: 24px;
`;

const RowContent = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;
