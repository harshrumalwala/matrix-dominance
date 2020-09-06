import styled, { css } from 'styled-components';

import { Button } from 'components';

export const ModalOverlay = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
    transition: ${theme.transition};
  `}
`;
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1020;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

export const ModalContent = styled.div`
  ${({ theme }) => css`
    z-index: 100;
    background: ${theme.colors.white};
    position: relative;
    margin: 20px auto;
    border-radius: 3px;
    max-width: 500px;
    padding: 20px;
  `}
`;

export const ModalButton = styled(Button)`
  display: inline-block;
  width: 49%;
`;
