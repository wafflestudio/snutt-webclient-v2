import type { SVGProps } from 'react';

export const IcLogo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" {...props}>
      <g fill="none" fillRule="evenodd">
        <path fill="#E54459" d="M0 0h12.226v17.066H0z" />
        <path fill="#1BD0C8" d="M14.774 9.934H27V27H14.774z" />
        <path fill="#FAC42D" d="M14.774 0H27v7.387H14.774z" />
        <path fill="#A6D930" d="M0 19.613h12.226V27H0z" />
      </g>
    </svg>
  );
};
