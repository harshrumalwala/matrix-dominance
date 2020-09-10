import { getNewGameState } from 'pages/room/helpers/logic';
import { CreateNewGameOutput } from 'typings';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { db } from 'services';

const useCreateNewGame = (isExisting: boolean): CreateNewGameOutput => {
  const [isCreatingNewGame, setIsCreatingNewGame] = useState<boolean>(false);
  const { roomId }: { roomId: string } = useParams();

  const createNewGame = async (
    players: Array<string>,
    host: string,
    matrixSize: number
  ) => {
    setIsCreatingNewGame(true);
    try {
      return isExisting
        ? await db
            .collection('rooms')
            .doc(roomId)
            .update(getNewGameState(players, host, matrixSize))
        : await db
            .collection('rooms')
            .add(getNewGameState(players, host, matrixSize))
            .then((doc) => doc.id);
    } catch (error) {
      console.error('Error while updating the board');
    }
    setIsCreatingNewGame(false);
  };

  return { isCreatingNewGame, createNewGame };
};

export default useCreateNewGame;
