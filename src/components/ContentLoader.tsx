import { content } from '@lib/theme/colors';
import { FC } from 'react';
import styled from 'styled-components';
import Flex from './Flex';

export const CircleContainer = styled.div<{
  $size: number;
}>`
  position: relative;
  height: ${(props) => props.$size}px;
  width: ${(props) => props.$size}px;
`;

export const CircleProgress = styled.div<{ $color?: string }>`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$color || content.primary};
  border-radius: 50%;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: ${content.primary};
    top: -2px;
    left: -2px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

interface ContentLoaderProps {
  size?: number;
  color?: string;
}

const ContentLoader: FC<ContentLoaderProps> = ({ size = 48, color }) => (
  <Flex justify="center">
    <CircleContainer $size={size}>
      <CircleProgress $color={color} />
    </CircleContainer>
  </Flex>
);

export default ContentLoader;
