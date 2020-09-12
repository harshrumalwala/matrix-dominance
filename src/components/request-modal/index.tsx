import React, { useEffect, FC } from 'react';
import _ from 'lodash';

import { Modal, Button } from 'components';
import { useModal, useJoinRoom, useCurrentUser, useUsers } from 'hooks';
import { RequestModalBody } from './styles';

const RequestModal: FC<{
  host: string;
  pendingInvite: Array<string>;
  players: Array<string>;
}> = ({ host, pendingInvite, players }) => {
  const { isShowing, toggle } = useModal();
  const { isJoiningRoom, joinRoom } = useJoinRoom();
  const currentUser = useCurrentUser();
  const { isFetching, users } = useUsers(pendingInvite);

  useEffect(() => {
    !_.isEmpty(pendingInvite) &&
      currentUser?.uid === host &&
      !isShowing &&
      !isFetching &&
      !isJoiningRoom &&
      toggle();
  });

  const sendRequest = () =>
    currentUser?.uid && joinRoom(currentUser?.uid, pendingInvite);

  const submitAction = async () => {
    await joinRoom(_.first(pendingInvite)!, pendingInvite, players, true);
    toggle();
  };
  const rejectAction = async () => {
    await joinRoom(_.first(pendingInvite)!, pendingInvite, players, false);
    toggle();
  };

  const isPlayerInQueue = () =>
    currentUser?.uid &&
    (_.includes(pendingInvite, currentUser?.uid) ||
      _.includes(players, currentUser?.uid));

  return (
    <>
      {!isPlayerInQueue() && <Button onClick={sendRequest}>Join Game</Button>}
      {!isJoiningRoom && (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          submitText="Accept"
          cancelText="Reject"
          submitAction={submitAction}
          cancelAction={rejectAction}
        >
          <RequestModalBody>
            Gamer: <strong>{users?.[_.first(pendingInvite)!]?.nickName}</strong>
            (<strong>{users?.[_.first(pendingInvite)!]?.nameInitials}</strong>)
            wants to join your room
          </RequestModalBody>
        </Modal>
      )}
    </>
  );
};

export default RequestModal;
