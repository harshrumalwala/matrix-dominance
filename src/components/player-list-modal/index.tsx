import React, { FC, MouseEvent, useState, useEffect } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import { Modal, List } from 'components';
import { useModal, useCreateNewGame } from 'hooks';
import {
  KickPlayerModalBody,
  PlayerDetails,
  PlayerItem,
  CloseButton,
  ItemMessage,
} from './styles';
import { User } from 'typings';

const PlayerListModal: FC<{
  players: Array<string>;
  users: { [key: string]: User } | undefined;
  host: string;
  matrixSize: number;
  matrixCount: { [key: string]: number };
  playerTurn: number;
  currentUser: firebase.User | null;
}> = ({
  players,
  host,
  matrixSize,
  users,
  matrixCount,
  playerTurn,
  currentUser,
}) => {
  const { isShowing, toggle } = useModal();
  const history = useHistory();
  const [kickPlayerId, setKickPlayerId] = useState<string | undefined>(
    undefined,
  );

  const { isCreatingNewGame, createNewGame } = useCreateNewGame(true);

  useEffect(() => {
    let mounted = true;
    if (users && players) {
      const newPlayers = _.filter(
        players,
        (player) => !_.isNil(users?.[player]),
      );
      mounted &&
        _.size(players) !== _.size(newPlayers) &&
        createNewGame(newPlayers, host, matrixSize);
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(users)]);

  const submitAction = async () => {
    toggle();
    await createNewGame(
      _.remove(players, (id) => id !== kickPlayerId),
      host,
      matrixSize,
    );
  };

  const getPlayerDetails = (player: string): string | undefined =>
    users?.[player] &&
    `${users[player].nickName} (${users[player].nameInitials})`;

  const getPlayerScore = (player: string): string | undefined =>
    users?.[player] && ` - ${matrixCount?.[users[player].nameInitials] ?? 0}`;

  const handlePlayerProfileClick = (
    e: MouseEvent<HTMLDivElement>,
    player: string,
  ) => {
    e.preventDefault();
    history.push(`/profile/${player}`);
  };

  const handleKickPlayer = (
    e: MouseEvent<HTMLButtonElement>,
    player: string,
  ) => {
    e.preventDefault();
    setKickPlayerId(player);
    toggle();
  };

  const getSubmitText = () => `${isCreatingNewGame ? 'Creating' : 'Yes'}`;

  return (
    <>
      <List>
        {_.map(
          players,
          (player: string, index: number) =>
            users?.[player] && (
              <PlayerItem
                key={`player-${index}`}
                isSelected={player === players?.[playerTurn]}
              >
                <ItemMessage>
                  <PlayerDetails
                    onClick={(e) => handlePlayerProfileClick(e, player)}
                  >
                    {player === host ? (
                      <strong>{getPlayerDetails(player)}</strong>
                    ) : (
                      getPlayerDetails(player)
                    )}
                    {getPlayerScore(player)}
                  </PlayerDetails>
                  {host === currentUser?.uid && player !== host && (
                    <CloseButton onClick={(e) => handleKickPlayer(e, player)}>
                      x
                    </CloseButton>
                  )}
                </ItemMessage>
              </PlayerItem>
            ),
        )}
      </List>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        submitText={getSubmitText()}
        cancelText="No"
        submitAction={submitAction}
        cancelAction={toggle}
      >
        <KickPlayerModalBody>
          Are you sure you want to kick{' '}
          <strong>{users?.[kickPlayerId!]?.nickName}</strong>?<br /> Game will
          restart...
        </KickPlayerModalBody>
      </Modal>
    </>
  );
};

export default PlayerListModal;
