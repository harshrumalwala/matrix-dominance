import { getUpdatedBoardState } from './../../helpers/logic';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { db } from 'services';
import { Room, ConnectDotsOutput } from 'typings';

const useConnectDots = (): ConnectDotsOutput => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { roomId }: { roomId: string } = useParams();

  const connectDots = async (idx: number, room: Room) => {
    setIsConnecting(true);
    try {
      await db
        .collection('rooms')
        .doc(roomId)
        .update(getUpdatedBoardState({ ...room, idx }));
    } catch (error) {
      console.error('Error while updating the board');
    }
    setIsConnecting(false);
  };

  return { isConnecting, connectDots };
};

export default useConnectDots;
