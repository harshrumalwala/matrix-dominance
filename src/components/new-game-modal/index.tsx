import React, { useState, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Field, Button } from 'components';
import { useModal, useCreateNewGame, useCurrentUser } from 'hooks';

const NewGameModal: FC<{ isExisting: boolean; players?: Array<string> }> = ({
  isExisting,
  players,
}) => {
  const history = useHistory();
  const { isShowing, toggle } = useModal();
  const [matrixSize, setMatrixSize] = useState<number | undefined>(undefined);
  const { isCreatingNewGame, createNewGame } = useCreateNewGame(isExisting);
  const currentUser = useCurrentUser();

  const submitAction = async () => {
    if (matrixSize) {
      toggle();
      if (isExisting && players) {
        createNewGame(players, parseInt(matrixSize.toString()));
      } else if (currentUser) {
        const roomId = await createNewGame(
          [currentUser.uid],
          parseInt(matrixSize.toString())
        );
        console.log('changing history');
        history.push(`/room/${roomId}`);
      }
    }
  };

  const getSubmitText = () =>
    isExisting
      ? `Start${isCreatingNewGame ? 'ing' : ''}`
      : `Creat${isCreatingNewGame ? 'ing' : 'e'}`;

  return (
    <>
      <Button onClick={toggle}>
        {isExisting ? 'New Game' : 'Create Game Room'}
      </Button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        submitText={getSubmitText()}
        cancelText="Cancel"
        submitAction={submitAction}
      >
        <Field
          id="matrixSize"
          label="Board Size"
          onChange={setMatrixSize}
          placeholder="Enter Board Size - 4 for 4 x 4 board"
          type="number"
          value={matrixSize ?? ''}
          key="matrixSize"
        />
      </Modal>
    </>
  );
};

export default NewGameModal;
