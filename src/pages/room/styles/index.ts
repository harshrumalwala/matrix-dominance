import { CellProps, DotProps, GridProps } from '../../../typings/index';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
`;

export const Dot = styled.span<DotProps>`
  ${({ theme, dotId, matrixSize, isSelected }) => css`
    margin: ${dotId < matrixSize ? '0px' : '10px'} 0px 0px
      ${dotId % matrixSize ? '30px' : '0px'};
    cursor: pointer;
    height: 13px;
    width: 13px;
    background-color: ${isSelected ? theme.colors.black : theme.colors.gray};
    border-radius: 50%;
    display: inline-block;
    z-index: 2;
  `}
`;

export const Cell = styled.div<CellProps>`
  ${({ theme, cellId, matrixSize }) => css`
    margin: 10px 0px 0px ${cellId % (matrixSize - 1) ? '30px' : '21px'};
    font-size: 10px;
    height: 12.8px;
    width: 12.5px;
  `}
`;

export const Grid = styled.div<GridProps>`
  ${({ theme, isConnectingDots }) => css`
    margin-bottom: 10px;
    padding: 10px;
    border: 2px solid ${theme.colors.black};
    background-color: ${isConnectingDots
      ? theme.colors.lightBlue
      : theme.colors.white};
  `}
`;
