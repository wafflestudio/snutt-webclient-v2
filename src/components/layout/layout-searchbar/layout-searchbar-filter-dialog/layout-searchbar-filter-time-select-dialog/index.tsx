import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from '@/components/dialog';
import { dayArray } from '@/entities/day';
import { CellStatus, Position } from '@/entities/timeMask';
import { timeMaskService } from '@/usecases/timeMaskService';

import { LayoutSearchbarFilterTimeSelectCell } from './layout-searchbar-filter-time-select-cell';

type Props = { open: boolean; onClose: () => void };

const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

/**
 * @note 테스트코드가 붙어있지 않습니다. 수정할 때 주의해 주세요!
 */
export const LayoutSearchbarFilterTimeSelectDialog = ({ open, onClose }: Props) => {
  const [dragStart, setDragStart] = useState<Position | null>(null);
  const [currentDrag, setCurrentDrag] = useState<Position | null>(null);
  const [cellStatus, setCellStatus] = useState<CellStatus>(
    timeMaskService.getInitialCellStatus(times.length * 2, dayArray.length),
  );

  const endDrag = () => {
    try {
      if (!dragStart || !currentDrag) throw new Error('cannot reach here');
      setCellStatus(timeMaskService.getUpdatedCellStatus(cellStatus, dragStart, currentDrag));
    } catch (err) {
      // TODO: capture sentry
    } finally {
      setDragStart(null);
      setCurrentDrag(null);
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialog.Title>검색하고 싶은 시간들을 드래그하세요</StyledDialog.Title>
      <StyledDialog.Content>
        <Table>
          <thead>
            <tr>
              <th />
              {dayArray.map((d) => (
                <Day key={d}>{d}</Day>
              ))}
            </tr>
          </thead>
          <tbody>
            {times
              .flatMap((t) => [t, ''])
              .map((t, i) => (
                <tr key={i}>
                  <Time>{t}</Time>
                  {dayArray.map((d, j) => (
                    <LayoutSearchbarFilterTimeSelectCell
                      i={i}
                      j={j}
                      key={j}
                      onDragStart={() => {
                        setDragStart({ i, j });
                        setCurrentDrag({ i, j });
                      }}
                      onDragEnter={() => setCurrentDrag({ i, j })}
                      onDragEnd={endDrag}
                      dragStart={dragStart}
                      currentDrag={currentDrag}
                      cellStatus={cellStatus}
                    />
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
      </StyledDialog.Content>
      <StyledDialog.Actions>
        <button data-testid="layout-searchbar-filter-time-select-dialog-cancel" onClick={onClose}>
          취소
        </button>
        <button>확인</button>
      </StyledDialog.Actions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  width: 500px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Day = styled.th`
  height: 40px;
  padding: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgb(232, 235, 240);
  user-select: none;
`;

const Time = styled.td`
  text-align: right;
  font-size: 14px;
  opacity: 0.4;
  padding-right: 7px;
  height: 16px;
  user-select: none;
`;
