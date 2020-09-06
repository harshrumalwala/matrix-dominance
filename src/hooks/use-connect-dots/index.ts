import {
  getUpdatedBoardState,
  isMatrixComplete,
} from 'pages/room/helpers/logic';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { db } from 'services';
import { Room, ConnectDotsOutput, User } from 'typings';

const useConnectDots = (): ConnectDotsOutput => {
  const [isConnectingDots, setIsConnectingDots] = useState<boolean>(false);
  const { roomId }: { roomId: string } = useParams();

  const connectDots = async (
    idx: number,
    room: Room,
    users: { [key: string]: User } | undefined
  ) => {
    setIsConnectingDots(true);
    try {
      !isMatrixComplete(room.matrix) &&
        (await db
          .collection('rooms')
          .doc(roomId)
          .update(getUpdatedBoardState({ ...room, idx, users })));
    } catch (error) {
      console.error('Error while updating the board');
    }
    setIsConnectingDots(false);
  };

  return { isConnectingDots, connectDots };
};

export default useConnectDots;
