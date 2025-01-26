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

interface ModalProps extends PropsWithChildren {
  modalName: ModalTypes;
}

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
          <CloseIcon
            style={{
              width: 28,
              height: 28,
              position: 'absolute',
              top: 25,
              right: 25,
            }}
            color={'#641AEE'}
            onClick={hideModal}
            size={28}
          />
        </StyledModalContent>
      </StyledModalWrap>
    </Portal>
  );
};
