import React, { useState, FC, useEffect } from 'react';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';

import { Button, Field, Header } from 'components';
import { db } from 'services';
import { useUsers, useCurrentUser } from 'hooks';
import { User } from 'typings';

const Profile: FC = () => {
  const { userId }: { userId: string } = useParams();
  const { isFetching, users } = useUsers([userId]);
  const user: User | undefined = users?.[userId];
  const currentUser = useCurrentUser();
  const history = useHistory();

  const [nickName, setNickName] = useState<string | undefined>(
    user?.nickName ?? ''
  );
  const [nickNameError, setNickNameError] = useState<string | undefined>(
    undefined
  );

  const [nameInitials, setNameInitials] = useState<string | undefined>(
    user?.nameInitials ?? ''
  );
  const [nameInitialsError, setNameInitialsError] = useState<
    string | undefined
  >(undefined);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    setNickName(user?.nickName ?? '');
    setNameInitials(user?.nameInitials ?? '');
  }, [isFetching, user]);

  useEffect(() => {
    setNickNameError(undefined);
    setNameInitialsError(undefined);
  }, [nickName, nameInitials]);

  useEffect(() => {
    nameInitials &&
      _.size(nameInitials) !== 2 &&
      setNameInitialsError('Name Initials should have exactly 2 characters');
  }, [nameInitials]);

  if (isFetching) return <Header>Loading Profile</Header>;

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!nickName) return setNickNameError('Nick Name is required');
    if (!nameInitials) return setNameInitialsError('Name Initials is required');
    if (!nickNameError && !nameInitialsError) {
      setIsUpdating(true);
      db.collection('users')
        .doc(userId)
        .set({
          nickName,
          nameInitials,
        })
        .then(() => setIsUpdating(false))
        .catch((error) => {
          setIsUpdating(false);
          throw new Error(error.message);
        });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <>
      <Header>Profile</Header>
      <Field
        id="nickName"
        label="Nick Name"
        onChange={setNickName}
        placeholder="Enter Nick Name"
        value={nickName}
        type="text"
        errorMessage={nickNameError}
        disabled={currentUser?.uid !== userId}
      />
      <Field
        id="nameInitials"
        label="Name Initials"
        onChange={setNameInitials}
        placeholder="Enter Name Initials"
        value={nameInitials}
        type="text"
        errorMessage={nameInitialsError}
        disabled={currentUser?.uid !== userId}
      />
      <Button
        disabled={isFetching || isUpdating || currentUser?.uid !== userId}
        onClick={handleUpdate}
      >
        Updat{isUpdating ? 'ing' : 'e'}
      </Button>
      <Button onClick={handleClick}>Home</Button>
    </>
  );
};

export default Profile;
