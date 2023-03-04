import { Key, ReactNode } from 'react';
import styled from 'styled-components';

type Props<T> = {
  className?: string;
  'data-testid'?: string;
  list: { label: ReactNode; degree: number; value: T }[];
  size?: number;
  selected: T | undefined;
  onSelect?: (value: T) => void;
};

export const Clock = <T extends Key>({ list, size = 200, onSelect, selected, ...props }: Props<T>) => {
  const radius = size / 2;
  const selectedItem = list.find((item) => selected === item.value);

  return (
    <Wrapper $size={size} {...props}>
      {list.map(({ label, degree, value }) => (
        <Label
          key={value}
          $selected={selectedItem?.value === value}
          style={{
            top: radius - Math.cos((degree * Math.PI) / 180) * (radius - 20),
            left: radius + Math.sin((degree * Math.PI) / 180) * (radius - 20),
          }}
          onClick={() => onSelect?.(value)}
        >
          {label}
        </Label>
      ))}
      {selectedItem && <Selector $size={size} style={{ transform: `rotate(${selectedItem.degree}deg)` }} />}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: #eee;
  border-radius: 50%;
  position: relative;
`;

const Selector = styled.div<{ $size: number }>`
  width: 30px;
  height: 30px;
  background-color: #1bd0c980;
  border-radius: 50%;
  position: absolute;

  top: 5px;
  left: calc(50% - 15px);
  transform-origin: 50% ${({ $size }) => $size / 2 - 5}px;
  transition: transform 0.2s;

  &::before {
    position: absolute;
    content: '';
    width: 1px;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    height: ${({ $size }) => $size / 2 - 38}px;
    background-color: inherit;
  }

  &::after {
    position: absolute;
    content: '';
    width: 6px;
    height: 6px;
    top: 90px;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    background-color: inherit;
  }
`;

const Label = styled.div<{ $selected: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 2;

  width: 30px;
  height: 30px;
  padding: 7px;
  line-height: 16px;
  font-size: 16px;
  text-align: center;

  border-radius: 50%;

  color: ${({ $selected }) => ($selected ? 'white' : 'black')};
  cursor: pointer;
`;
