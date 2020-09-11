import styled, { css } from 'styled-components';

export const List = styled.ul`
  margin: auto;
  padding-left: 4px;
`;

export const Item = styled.li`
  ${({ theme }) => css`
    display: block;
    border-top: 1px solid ${theme.colors.black};
    list-style-type: none;
    padding: 5px 5px;
    &:hover {
      background: ${theme.colors.lightGray};
      cursor: pointer;
    }
  `}
`;
