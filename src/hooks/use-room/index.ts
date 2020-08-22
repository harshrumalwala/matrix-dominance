import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { db } from 'services';
import { RoomOutput, Room } from 'typings';

const useRoom = (): RoomOutput => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [room, setRoom] = useState<Room | undefined>();
  const { roomId }: { roomId: string } = useParams();

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        doc.exists
          ? setRoom(doc.data() as Room)
          : console.log('Room not found');
        setIsFetching(false);
      });

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  return { isFetching, room };
};

export default useRoom;
