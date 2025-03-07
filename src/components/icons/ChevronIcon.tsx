import { FC, SVGProps } from 'react';
import withIcon from '@hocs/withIcon';

const Icon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill-rule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
    />
  </svg>
);

const ChevronIcon = withIcon(Icon);

ChevronIcon.displayName = 'ChevronIcon';
export default ChevronIcon;
