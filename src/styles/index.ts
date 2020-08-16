import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  margin-left: 10px;
  font-size: 0px;
`;

export const Dot = styled.span`
  margin: 10px 0px 0px 30px;
  cursor: pointer;
  height: 13px;
  width: 13px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
`;

export const Cell = styled.div`
  // z-index: 100;
  margin: 10px 0px 0px 30px;
  font-size: 10px;
`;
