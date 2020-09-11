import React, { MouseEvent } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import { RoomListItem } from 'typings';
import { List, Item } from './styles';
import { useGetRooms, useUsers } from 'hooks';
import { Header, Button } from 'components';

const RoomList = () => {
  const history = useHistory();
  const { isFetchingRooms, rooms } = useGetRooms();
  const { isFetching, users } = useUsers(
    _(rooms)
      .map((room) => _(room).pick(['host']).values().value())
      .flatten()
      .value(),
  );

  if (isFetchingRooms || isFetching) return <Header>Fetching Room List</Header>;

  const handleClick = (e: MouseEvent<HTMLLIElement>, roomId: string) => {
    e.preventDefault();
    history.push(`/room/${roomId}`);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <>
      <Header>Active Rooms (Host)</Header>
      <List>
        {_.map(rooms, (room: RoomListItem, index: number) => (
          <Item
            key={`room-${index}`}
            onClick={(e) => handleClick(e, room.roomId)}
          >
            {room.roomId} ({users?.[room.host]?.nickName ?? room.host})
          </Item>
        ))}
      </List>
      <Button onClick={handleHomeClick}>Home</Button>
    </>
  );
};

export default RoomList;
