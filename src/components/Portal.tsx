import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  elementId: string;
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ elementId, children }) => {
  const container: HTMLElement | null = document.getElementById(elementId);
  return container ? createPortal(children, container) : null;
};

export default Portal;
