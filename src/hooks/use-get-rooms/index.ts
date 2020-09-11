import { useEffect, useState } from 'react';
import { db } from 'services';
import { RoomListOutput, RoomListItem } from 'typings';

const useGetRooms = (): RoomListOutput => {
  const [isFetchingRooms, setIsFetchingRooms] = useState<boolean>(true);
  const [rooms, setRooms] = useState<Array<RoomListItem>>([]);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot((querySnapshot) => {
      let roomList: Array<RoomListItem> = [];
      querySnapshot.forEach((doc) => {
        roomList = [...roomList, { roomId: doc.id, host: doc.data().host }];
      });
      setRooms(roomList);
      setIsFetchingRooms(false);
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  return { isFetchingRooms, rooms };
};

export default useGetRooms;