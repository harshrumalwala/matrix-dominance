import styled, { css } from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  max-width: fit-content;
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    text-align: center;
    margin-top: 0;
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    border-radius: 15px;
    background-color: ${theme.colors.white};
    max-height: fit-content;
    padding: 15px;
  `}
`;
