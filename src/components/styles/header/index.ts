import styled, { css } from 'styled-components';

export const Header = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    text-align: center;
  `}
`;
