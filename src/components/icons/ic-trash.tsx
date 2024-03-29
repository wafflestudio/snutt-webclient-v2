import type { SVGProps } from 'react';

export const IcTrash = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect width="10.706" height="1" x="4.647" y="17" fill="#000" rx=".5" />
        <rect width="12" height="1" x="-1.479" y="11.45" fill="#000" rx=".5" transform="rotate(85 4.521 11.95)" />
        <rect width="12" height="1" x="9.521" y="11.45" fill="#000" rx=".5" transform="rotate(95 15.521 11.95)" />
        <rect width="13.2" height="1" x="3.4" y="4.4" stroke="#000" strokeWidth=".8" rx=".5" />
        <rect width="1" height="5.764" x="8.4" y="8.733" stroke="#000" strokeWidth=".8" rx=".5" />
        <path stroke="#000" d="M8.5 4.5h3V2.8a.3.3 0 0 0-.3-.3H8.8a.3.3 0 0 0-.3.3v1.7z" />
        <rect width="1" height="5.764" x="11.4" y="8.733" stroke="#000" strokeWidth=".8" rx=".5" />
      </g>
    </svg>
  );
};
