import React, { useState, FC } from 'react';

import { Modal, Field, Button } from 'components';
import { useModal } from 'hooks';

const NewGameModal: FC<{ isNew: boolean }> = ({ isNew }) => {
  const { isShowing, toggle } = useModal();
  const [matrixSize, setMatrixSize] = useState<number | undefined>(undefined);

  const submitAction = () => {
    console.log('clicked on success');
  };

  return (
    <>
      <Button onClick={toggle}>
        {isNew ? 'New Game' : 'Create Game Room'}
      </Button>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        submitText={isNew ? 'New' : 'Create'}
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
