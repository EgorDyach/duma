import { FC, SVGProps } from "react";
import withIcon from "@hocs/withIcon";

const Icon: FC = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="27.3794" height="27.3794" rx="13.6897" fill="currentColor" />
    <path
      d="M9.15283 18.8804L19.2714 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M19.271 18.8804L9.15245 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = withIcon(Icon);

CloseIcon.displayName = "CloseIcon";
export default CloseIcon;
