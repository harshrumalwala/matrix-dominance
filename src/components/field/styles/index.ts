import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`;

export const Input = styled.input<{errorMessage?: string}>`
  ${({ theme, errorMessage }) => css`
    background-color: ${theme.colors.white};
    border: solid 2px ${errorMessage ? 'red' : theme.colors.lightGray};
    border-radius: 10px;
    color: ${theme.colors.black};
    height: 40px;
    width: 300px;
    padding: 0 15px;

    &:focus {
      border: 2px solid ${theme.colors.blue};
      outline: none;
    }
  `}
`;

export const Label = styled.label<{errorMessage?: string}>`
  ${({ theme, errorMessage }) => css`
    color: ${errorMessage ? 'red' : theme.colors.black};
    font-weight: bold;
    padding-left: 15px;
    margin-bottom: 5px;
  `}
`;
