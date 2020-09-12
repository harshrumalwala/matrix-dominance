import styled, { css } from 'styled-components';

export const List = styled.ul`
  width: 100%;
  margin: auto;
  padding-left: 4px;
`;

export const Item = styled.li<{ isSelected?: boolean }>`
  ${({ theme, isSelected }) => css`
    display: block;
    border-top: 1px solid ${theme.colors.black};
    list-style-type: none;
    padding: 5px 5px;
    background-color: ${isSelected
      ? theme.colors.lightBlue
      : theme.colors.white};
    &:hover {
      background: ${theme.colors.lightGray};
      cursor: pointer;
    }
  `}
`;
