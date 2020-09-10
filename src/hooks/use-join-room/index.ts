import { updateRoomPlayers } from 'pages/room/helpers/logic';
import { JoinRoomOutput } from 'typings';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { db } from 'services';

const useJoinRoom = (): JoinRoomOutput => {
  const [isJoiningRoom, setIsJoiningRoom] = useState<boolean>(false);
  const { roomId }: { roomId: string } = useParams();

  const joinRoom = async (
    userId: string,
    pendingInvite: Array<string>,
    players?: Array<string>,
    isAccepted?: boolean
  ) => {
    setIsJoiningRoom(true);
    try {
      await db
        .collection('rooms')
        .doc(roomId)
        .update(updateRoomPlayers(userId, pendingInvite, players, isAccepted));
    } catch (error) {
      console.error('Error while joining this room', error);
    }
    setIsJoiningRoom(false);
  };

  return { isJoiningRoom, joinRoom };
};

export default useJoinRoom;
