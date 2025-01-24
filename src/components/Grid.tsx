import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface GridProps {
  children: ReactNode;
  templateColumns?: string;
  gap?: string;
  className?: string;
}

const StyledGrid = styled.div<{ templateColumns?: string; gap?: string }>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) =>
    templateColumns || 'repeat(auto, minmax(200px, 1fr))'};
  gap: ${({ gap }) => gap || '0'};
  overflow-x: auto; /* Позволяет горизонтальную прокрутку */
  max-width: 100%; /* Ограничиваем ширину */
`;

const Grid: React.FC<GridProps> = ({
  children,
  templateColumns,
  gap,
  className,
}) => {
  return (
    <StyledGrid
      templateColumns={templateColumns}
      gap={gap}
      className={className}
    >
      {children}
    </StyledGrid>
  );
};

export default Grid;
