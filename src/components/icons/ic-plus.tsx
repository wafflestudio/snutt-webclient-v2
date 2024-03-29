import type { SVGProps } from 'react';

export const IcPlus = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" {...props}>
      <path fill="#000" fillRule="evenodd" d="M5 5H0v1h5v5h1V6h5V5H6V0H5v5z" />
    </svg>
  );
};
