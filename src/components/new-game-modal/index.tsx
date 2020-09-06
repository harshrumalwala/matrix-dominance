import React, { useState, FC } from 'react';

import { Modal, Field, Button } from 'components';
import { useModal, useCreateNewGame } from 'hooks';

const NewGameModal: FC<{ isNew: boolean; players?: Array<string> }> = ({
  isNew,
  players,
}) => {
  const { isShowing, toggle } = useModal();
  const [matrixSize, setMatrixSize] = useState<number | undefined>(undefined);
  const { isCreatingNewGame, createNewGame } = useCreateNewGame();

  const submitAction = () => {
    if (matrixSize) {
      if (isNew && players) {
        createNewGame(players, parseInt(matrixSize.toString()));
      } else {
      }
    }

    toggle();
  };

  const getSubmitText = () =>
    isNew
      ? `Start${isCreatingNewGame ? 'ing' : ''}`
      : `Creat${isCreatingNewGame ? 'ing' : 'e'}`;

  return (
    <>
      <Button onClick={toggle}>
        {isNew ? 'New Game' : 'Create Game Room'}
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
