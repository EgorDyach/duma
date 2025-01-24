import { FC, SVGProps } from 'react';
import withIcon from '@hocs/withIcon';

const Icon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <path d="M8 4V12" stroke="white" />
    <path d="M4 8H12" stroke="white" />
  </svg>
);

const PlusIcon = withIcon(Icon);

PlusIcon.displayName = 'PlusIcon';
export default PlusIcon;
