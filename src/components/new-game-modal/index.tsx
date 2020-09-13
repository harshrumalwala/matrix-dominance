import React, { useState, useEffect, FC } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Modal, Field, Button } from 'components';
import { useModal, useCreateNewGame, useCurrentUser } from 'hooks';

const NewGameModal: FC<{
  isExisting: boolean;
  players?: Array<string>;
  host?: string;
}> = ({ isExisting, players, host }) => {
  const history = useHistory();
  const { isShowing, toggle } = useModal();
  const [matrixSize, setMatrixSize] = useState<number | undefined>(undefined);
  const [matrixSizeError, setMatrixSizeError] = useState<string>('');
  const { isCreatingNewGame, createNewGame } = useCreateNewGame(isExisting);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setMatrixSizeError('');
  }, [matrixSize]);

  useEffect(() => {
    matrixSize &&
      (parseInt(matrixSize.toString()) < 3 ||
        parseInt(matrixSize.toString()) > 10) &&
      setMatrixSizeError('Board size should be in between 3 and 10');
  }, [matrixSize]);

  const submitAction = async () => {
    if (matrixSize && _.isEmpty(matrixSizeError)) {
      toggle();
      if (isExisting && players && host) {
        createNewGame(players, host, parseInt(matrixSize.toString()));
      } else if (currentUser) {
        const roomId = await createNewGame(
          [currentUser.uid],
          currentUser.uid,
          parseInt(matrixSize.toString()),
        );
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
        cancelAction={toggle}
      >
        <Field
          id="matrixSize"
          label="Board Size"
          onChange={setMatrixSize}
          placeholder="Enter Board Size - 4 for 4 x 4 board"
          type="number"
          value={matrixSize ?? ''}
          key="matrixSize"
          errorMessage={matrixSizeError}
        />
      </Modal>
    </>
  );
};

export default NewGameModal;
