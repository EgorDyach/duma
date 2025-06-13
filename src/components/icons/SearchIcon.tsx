import { FC, SVGProps } from 'react';
import withIcon from '@hocs/withIcon';

const Icon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="8.5" cy="8.5" r="7.75" stroke="white" stroke-width="1.5" />
    <line
      x1="18.9393"
      y1="20"
      x2="14"
      y2="15.0607"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const SearchIcon = withIcon(Icon);

SearchIcon.displayName = 'SearchIcon';
export default SearchIcon;
