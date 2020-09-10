import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { auth, db } from 'services';

import { Field, Header, Button, ErrorMessage } from 'components';
import { usePrevious } from 'hooks';

const Login = () => {
  const history = useHistory();
  const [nickName, setNickName] = useState<string | undefined>('');
  const [nickNameError, setNickNameError] = useState<string>('');

  const [nameInitials, setNameInitials] = useState<string | undefined>('');
  const [nameInitialsError, setNameInitialsError] = useState<string>('');

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [firebaseError, setFirebaseError] = useState<string>('');
  const prevIsLoggingIn = usePrevious(isLoggingIn);

  useEffect(() => {
    setNickNameError('');
    setNameInitialsError('');
    setFirebaseError('');
  }, [nickName, nameInitials]);

  useEffect(() => {
    nameInitials &&
      _.size(nameInitials) !== 2 &&
      setNameInitialsError('Name Initials should have exactly 2 characters');
  }, [nameInitials]);

  useEffect(() => {
    prevIsLoggingIn && !isLoggingIn && !firebaseError && history.push('/');
  }, [isLoggingIn, firebaseError, prevIsLoggingIn, history]);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!nickName) return setNickNameError('Nick Name is required');
    if (!nameInitials) return setNameInitialsError('Name Initials is required');

    if (!nickNameError && !nameInitialsError) {
      setIsLoggingIn(true);
      await auth
        .signInAnonymously()
        .then((response) => {
          if (!response.user) throw new Error('Error while creating user');
          db.collection('users')
            .doc(response.user.uid)
            .set({
              nickName,
              nameInitials,
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        })
        .catch((error) => setFirebaseError(error.message));
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Header>Login</Header>
      <Field
        id="nickName"
        label="Nick Name"
        onChange={setNickName}
        placeholder="Enter your Nick Name"
        type="text"
        value={nickName}
        errorMessage={nickNameError}
      />
      <Field
        id="nameInitials"
        label="Name Initials"
        onChange={setNameInitials}
        placeholder="Enter your Name Initials like AE for Albert Einstein"
        type="text"
        value={nameInitials}
        errorMessage={nameInitialsError}
      />
      <Button disabled={isLoggingIn} onClick={handleLogin}>
        Log{isLoggingIn ? 'ging' : ''} in
      </Button>
      {firebaseError && <ErrorMessage>{firebaseError}</ErrorMessage>}
    </>
  );
};

export default Login;
