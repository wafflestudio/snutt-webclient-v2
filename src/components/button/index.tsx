import { ButtonHTMLAttributes, forwardRef } from 'react';
import styled, { css } from 'styled-components';

type Variant = 'contained' | 'outlined' | 'text';
type Size = 'big' | 'small';
type Color = 'mint' | 'blue' | 'black' | 'red';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  color?: Color;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = 'contained', size = 'big', color = 'mint', ...props }, ref) => {
    const Component = { contained: Contained, outlined: Outlined, text: Text }[variant];

    return (
      <Component $size={size} $color={color} ref={ref} {...props}>
        {children}
      </Component>
    );
  },
);

const buttonColor = { mint: '#1bd0c9', blue: '#1414c3', black: '#323232', red: '#ec3030' } as const;

const commonStyle = css`
  cursor: pointer;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.2s, background-color 0.1s;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    cursor: default;
    opacity: 0.8;
  }
`;

const bigSize = css`
  padding: 0 24px;
  height: 36px;
  border-radius: 18px;
`;
const mediumSize = css``;
const smallSize = css``;

const Contained = styled.button<{ $size: Size; $color: Color }>`
  ${commonStyle}
  ${({ $size }) => ({ big: bigSize, medium: mediumSize, small: smallSize }[$size])}
  border: none;
  color: #fff;
  background-color: ${({ $color }) => buttonColor[$color]};

  &:disabled {
    background-color: #ddd;
  }
`;

const Outlined = styled.button<{ $size: Size; $color: Color }>`
  ${commonStyle}
  ${({ $size }) => ({ big: bigSize, medium: mediumSize, small: smallSize }[$size])}
  border: 1px solid ${({ $color }) => buttonColor[$color]};
  color: ${({ $color }) => buttonColor[$color]};
  background-color: transparent;
  transition: background-color 0.1s, opacity 0.2s;

  &:hover {
    background-color: ${({ $color }) => `${buttonColor[$color]}10`};
  }
`;

const Text = styled.button<{ $size: Size; $color: string }>`
  ${commonStyle}
  ${({ $size }) => ({ big: bigSize, medium: mediumSize, small: smallSize }[$size])}
`;
