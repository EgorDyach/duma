import withIcon from '@hocs/withIcon';
import { FC, SVGProps } from 'react';

const Icon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="10"
    height="11"
    viewBox="0 0 10 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.3235 6.1265C8.3235 6.1265 5.52031 9.05483 4.34387 9.67562C3.30841 10.222 2.40389 10.07 1.62763 9.28127C0.803522 8.44396 0.851632 7.30954 1.4203 6.5064C1.9077 5.81804 4.86059 1.76876 6.52867 1.16871C7.28802 0.895556 7.87874 0.96327 8.3235 1.30547C8.76816 1.64759 9.28989 2.21147 8.80669 3.36391C8.3235 4.51636 5.36387 7.28162 4.80285 7.6678C4.31965 8.0004 3.67114 8.06872 3.28415 7.6678C3.00732 7.381 3.07705 6.84799 3.28415 6.5064C3.87951 5.52439 5.90733 3.56756 5.90733 3.56756"
      stroke="#8D8D8D"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
  </svg>
);

const ClipIcon = withIcon(Icon);

ClipIcon.displayName = 'ClipIcon';
export default ClipIcon;
