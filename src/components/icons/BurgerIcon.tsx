import { FC, SVGProps } from 'react';
import withIcon from '@hocs/withIcon';

const Icon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="31"
    height="24"
    viewBox="0 0 31 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2 2H29" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M2 12H29" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M2 22H29" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const BurgerIcon = withIcon(Icon);

BurgerIcon.displayName = 'BurgerIcon';
export default BurgerIcon;
