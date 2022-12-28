import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from '@/components/dialog';

import { LayoutSearchbarFilterTimeSelectDialog } from './layout-searchbar-filter-time-select-dialog';

type Props = { open: boolean; onClose: () => void };

type TimeForm = { checked: boolean; type: 'auto' | 'manual' | null };

export const LayoutSearchbarFilterDialog = ({ open, onClose }: Props) => {
  const [isTimeModalOpen, setTimeModalOpen] = useState(false);
  const [timeForm, setTimeForm] = useState<TimeForm>({ checked: false, type: null });

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
                checked={timeForm.checked}
                onChange={(e) => setTimeForm({ checked: e.target.checked, type: null })}
              />
            </label>
            <label>
              빈 시간대만 검색하기
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-radio-auto"
                type="radio"
                name="time"
                disabled={!timeForm.checked}
                checked={timeForm.type === 'auto'}
                onChange={() => setTimeForm({ checked: true, type: 'auto' })}
              />
            </label>
            <label>
              시간대 직접 선택하기
              <input
                data-testid="layout-searchbar-filter-dialog-form-time-radio-manual"
                type="radio"
                name="time"
                disabled={!timeForm.checked}
                checked={timeForm.type === 'manual'}
                onChange={() => setTimeForm({ checked: true, type: 'manual' })}
              />
            </label>
            <button
              type="button"
              disabled={timeForm.type !== 'manual'}
              data-testid="layout-searchbar-filter-dialog-form-time-manual-button"
              onClick={() => setTimeModalOpen(true)}
            >
              선택창 열기
            </button>
          </Row>
        </form>
      </StyledContent>
      <LayoutSearchbarFilterTimeSelectDialog open={isTimeModalOpen} onClose={() => setTimeModalOpen(false)} />
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
