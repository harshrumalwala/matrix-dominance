import { DotProps } from './../typings/index';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  margin-left: 10px;
`;

export const Dot = styled.span<DotProps>`
  margin: 10px 0px 0px 30px;
  cursor: pointer;
  height: 13px;
  width: 13px;
  background-color: ${(props) => (props.isSelected ? 'black' : '#bbb')};
  border-radius: 50%;
  display: inline-block;
  z-index: 2;
`;

export const Cell = styled.div`
  margin: 10px 0px 0px 30px;
  font-size: 10px;
  height: 12.8px;
  width: 12.5px;
`;

export const Button = styled.button`
  margin: 20px;
`;
