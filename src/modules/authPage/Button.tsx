import { FC, PropsWithChildren } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  position: absolute;
`;
const ButtonContainer = styled.button`
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 10px;
  background-color: #5727ec;
  color: white; /* Цвет текста, если вы добавите текст */
  cursor: pointer;
  font-size: 16px; /* Размер шрифта, если вы добавите текст */
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s,
    transform 0.2s;

  &:hover {
    background-color: #4a1db0; /* Цвет при наведении */
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const Button: FC<
  PropsWithChildren & {
    onClick: VoidFunction;
    isLoading: boolean;
    lowPadding?: boolean;
  }
> = ({ children, onClick, isLoading, lowPadding }) => {
  return (
    <ButtonContainer onClick={onClick} style={{ height: lowPadding ? 32 : 55 }}>
      {' '}
      {isLoading && <Spinner />}
      {!isLoading && children}
    </ButtonContainer>
  );
};

export default Button;
