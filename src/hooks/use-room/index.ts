import { enrichRoom } from 'pages/room/helpers/logic';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import { db } from 'services';
import { RoomOutput, Room } from 'typings';
import { useUsers } from 'hooks';

const useRoom = (): RoomOutput => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [room, setRoom] = useState<Room | undefined>();
  const [firebaseRoom, setFireBaseRoom] = useState<Room | undefined>();
  const { roomId }: { roomId: string } = useParams();
  const { isFetching: isFetchingUsers, users } = useUsers(room?.players);

  useEffect(() => {
    if (users && !_.isEmpty(users) && firebaseRoom) {
      users?.[firebaseRoom.host!]
        ? setRoom(enrichRoom(firebaseRoom, users))
        : setRoom(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(users)]);

  useEffect(() => {
    const unsubscribe = db
      .collection('rooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setRoom(enrichRoom(doc.data() as Room, users));
          setFireBaseRoom(doc.data() as Room);
        } else {
          setRoom(undefined);
          setFireBaseRoom(undefined);
        }
        setIsFetching(false);
      });

    return () => {
      unsubscribe();
    };
  }, [roomId, users]);

  return { isFetching, isFetchingUsers, room, users };
};

export default useRoom;
