import CloseIcon from '@components/icons/CloseIcon';
import { FC, PropsWithChildren } from 'react';
import {
  StyledModalWrap,
  StyledModalContent,
  Backdrop,
} from '@components/Modal/ModalStyles';
import Portal from '@components/Portal';
import { ModalTypes } from '@store/ui/types';
import { useSelector } from 'react-redux';
import { uiActions, uiSelectors } from '@store/ui';
import { useAppDispatch } from '@hooks/useAppDispatch';
import styled from 'styled-components';

interface ModalProps extends PropsWithChildren {
  modalName: ModalTypes;
}

const StyledIcon = styled(CloseIcon)`
  cursor: pointer;
  width: 28px !important;
  height: 28px !important;
  position: absolute;
  top: 25px;
  right: 25px;
`;

export const Modal: FC<ModalProps> = ({ children, modalName }) => {
  const modals = useSelector(uiSelectors.getModals);
  const dispatch = useAppDispatch();

  const hideModal = () => dispatch(uiActions.closeModals());

  if (!modals[modalName].isOpened) return;

  return (
    <Portal elementId="overlay">
      <Backdrop onClick={hideModal} />

      <StyledModalWrap $size={'default'}>
        <StyledModalContent>
          {children}
          <StyledIcon color={'#641AEE'} onClick={hideModal} />
        </StyledModalContent>
      </StyledModalWrap>
    </Portal>
  );
};
