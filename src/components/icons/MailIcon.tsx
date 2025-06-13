import { FC, SVGProps } from 'react';
import withIcon from '@hocs/withIcon';

const Icon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="30"
    height="22"
    viewBox="0 0 30 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="1.16016"
      y="0.75"
      width="27.9117"
      height="19.6764"
      rx="2.25"
      stroke="white"
      stroke-width="1.5"
    />
    <path
      d="M28.6447 1.76426L16.4178 12.2572C15.6686 12.9002 14.5621 12.9002 13.8128 12.2572L1.58594 1.76426"
      stroke="white"
      stroke-width="1.5"
    />
  </svg>
);

const MailIcon = withIcon(Icon);

MailIcon.displayName = 'MailIcon';
export default MailIcon;
