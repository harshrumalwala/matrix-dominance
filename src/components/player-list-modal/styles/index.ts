import styled from 'styled-components';
import { Button, Item } from 'components';

export const KickPlayerModalBody = styled.div`
  padding: 10px;
`;

export const CloseButton = styled(Button)`
  height: 25px;
  min-height: 25px;
  width: 25px;
  float: right;
  margin: auto;
`;

export const PlayerDetails = styled.div`
  float: left;
  line-height: 25px;
`;

export const ItemMessage = styled.div`
  display: inline-block;
  width: 100%;
`;

export const PlayerItem = styled(Item)`
  line-height: 0px;
`;
