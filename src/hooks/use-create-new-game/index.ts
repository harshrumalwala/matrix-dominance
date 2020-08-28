import { getNewGameState } from 'helpers/logic';
import { CreateNewGameOutput } from 'typings';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { db } from 'services';

const useCreateNewGame = (): CreateNewGameOutput => {
  const [isCreatingNewGame, setIsCreatingNewGame] = useState<boolean>(false);
  const { roomId }: { roomId: string } = useParams();

  const createNewGame = async (players: Array<string>, matrixSize: number) => {
    setIsCreatingNewGame(true);
    try {
      await db
        .collection('rooms')
        .doc(roomId)
        .update(getNewGameState(players, matrixSize));
    } catch (error) {
      console.error('Error while updating the board');
    }
    setIsCreatingNewGame(false);
  };

  return { isCreatingNewGame, createNewGame };
};

export default useCreateNewGame;
