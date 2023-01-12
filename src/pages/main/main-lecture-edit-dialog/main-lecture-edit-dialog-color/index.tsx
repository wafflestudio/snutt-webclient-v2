import { useState } from 'react';
import styled from 'styled-components';

import { COLOR_LABEL_MAP } from '@/constants/color';
import { Color } from '@/entities/color';

type Props = {
  colorList: Color[];
  currentColor: Color;
  onChangeColor: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, color: Color) => void;
};

export const MainLectureEditDialogColor = ({ colorList, currentColor: { bg, fg }, onChangeColor }: Props) => {
  const isCustomColor = colorList.every((c) => c.bg !== bg);
  const [customColor, setCustomColor] = useState('#888888');

  return (
    <ColorChipsWrapper>
      {colorList.map((c, i) => {
        const isSelected = bg === c.bg;

        return (
          <ColorChip
            data-testid="main-lecture-edit-dialog-color"
            key={c.bg}
            style={
              isSelected
                ? { border: `1px solid ${c.bg}`, backgroundColor: c.bg, color: c.fg }
                : { border: `1px solid ${c.bg}`, color: c.bg }
            }
            onClick={() => onChangeColor(i as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, c)}
          >
            {COLOR_LABEL_MAP[c.bg] ?? c.bg}
          </ColorChip>
        );
      })}

      <CustomColorChip
        style={
          isCustomColor
            ? { border: `1px solid ${bg}`, backgroundColor: `${bg}`, color: `${fg}` }
            : { border: `1px solid rgb(183, 195, 206)`, color: 'rgb(183, 195, 206)' }
        }
      >
        나만의 색
        <Palette
          value={customColor}
          onChange={(e) => {
            onChangeColor(9, { bg: e.target.value, fg: '#ffffff' });
            setCustomColor(e.target.value);
          }}
          onClick={(e) =>
            'value' in e.target &&
            typeof e.target.value === 'string' &&
            onChangeColor(9, { bg: e.target.value, fg: '#ffffff' })
          }
        />
      </CustomColorChip>
    </ColorChipsWrapper>
  );
};

const ColorChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ColorChip = styled.label`
  padding: 4px 8px;
  font-family: Courier;
  font-size: 11px;
  font-weight: 500;
  margin: 0;
  border-radius: 12px;
  cursor: pointer;

  transition: all 0.1s;
`;

const CustomColorChip = styled.label`
  padding: 4px 8px;
  font-family: Courier;
  font-size: 11px;
  font-weight: 500;
  margin: 0;
  border-radius: 4px;
  cursor: pointer;

  transition: all 0.1s;
`;

const Palette = styled.input.attrs({ type: 'color' })`
  display: none;
`;
