import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import {
  ModalOverlay,
  ModalContent,
  ModalWrapper,
  ModalButton,
} from './styles';

const Modal: FC<{
  isShowing: boolean;
  hide: () => void;
  submitText: string;
  cancelText: string;
  submitAction: () => void;
  cancelAction: () => void;
}> = ({
  isShowing,
  hide,
  children,
  submitText,
  cancelText,
  submitAction,
  cancelAction,
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay>
            <ModalWrapper key="modal">
              <ModalContent>
                {children}
                <ModalButton onClick={submitAction}>{submitText}</ModalButton>
                <ModalButton onClick={cancelAction}>{cancelText}</ModalButton>
              </ModalContent>
            </ModalWrapper>
          </ModalOverlay>
        </>,
        document.body
      )
    : null;

export default Modal;
