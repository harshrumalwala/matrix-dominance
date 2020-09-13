import React, { FC, useState } from 'react';

import { Button, ErrorMessage } from 'components/styles';
import { auth, db } from 'services';
import { useCurrentUser } from 'hooks';

const Logout: FC = () => {
  const { currentUser } = useCurrentUser();

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [firebaseError, setFirebaseError] = useState<string>('');

  const handleClick = () => {
    setIsLoggingOut(true);
    setFirebaseError('');

    auth
      .signOut()
      .then(() => setIsLoggingOut(false))
      .catch((error) => {
        setFirebaseError(error.message);
        setIsLoggingOut(false);
      });

    db.collection('users')
      .doc(currentUser?.uid)
      .delete()
      .then(() => console.log('User successfully deleted'))
      .catch((error) => {
        throw new Error(error.message);
      });

    db.collection('rooms')
      .where('host', '==', currentUser?.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
          console.log(
            `Room - ${doc.id} with host - ${
              doc.data().host
            } successfully deleted`,
          );
        });
      });
  };

  return (
    <>
      <Button disabled={isLoggingOut} onClick={handleClick}>
        Log{isLoggingOut ? 'ging' : ''} Out
      </Button>
      {firebaseError && <ErrorMessage>{firebaseError}</ErrorMessage>}
    </>
  );
};

export default Logout;
