import withIcon from '@hocs/withIcon';
import { FC, SVGProps } from 'react';

const Icon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.84409 5.65077C9.84409 9.21183 5.16521 12.2642 5.16521 12.2642C5.16521 12.2642 0.486328 9.21183 0.486328 5.65077C0.486328 4.43648 0.97928 3.27192 1.85674 2.41328C2.7342 1.55464 3.92429 1.07227 5.16521 1.07227C6.40613 1.07227 7.59622 1.55464 8.47368 2.41328C9.35114 3.27192 9.84409 4.43648 9.84409 5.65077Z"
      stroke="black"
      strokeOpacity="0.6"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.1651 7.17734C6.02645 7.17734 6.72472 6.49405 6.72472 5.65117C6.72472 4.80829 6.02645 4.125 5.1651 4.125C4.30374 4.125 3.60547 4.80829 3.60547 5.65117C3.60547 6.49405 4.30374 7.17734 5.1651 7.17734Z"
      stroke="black"
      strokeOpacity="0.6"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PointIcon = withIcon(Icon);

PointIcon.displayName = 'PointIcon';
export default PointIcon;
