import React, { useState, FC, useEffect } from 'react';
import _ from 'lodash';
import { useParams, useHistory } from 'react-router-dom';

import { Button, Field, Header } from 'components';
import { db } from 'services';
import { useCurrentUser, useUser } from 'hooks';

const Profile: FC = () => {
  const { userId }: { userId: string } = useParams();
  const { isFetching, user } = useUser();
  const currentUser = useCurrentUser();
  const history = useHistory();

  const [nickName, setNickName] = useState<string>(user?.nickName ?? '');
  const [nickNameError, setNickNameError] = useState<string>('');

  const [nameInitials, setNameInitials] = useState<string>(
    user?.nameInitials ?? ''
  );
  const [nameInitialsError, setNameInitialsError] = useState<string>('');

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    setNickName(user?.nickName ?? '');
    setNameInitials(user?.nameInitials ?? '');
  }, [isFetching, user]);

  useEffect(() => {
    setNickNameError('');
    setNameInitialsError('');
  }, [nickName, nameInitials]);

  useEffect(() => {
    nameInitials.length > 0 &&
      _.size(nameInitials) !== 2 &&
      setNameInitialsError('Name Initials should have exactly 2 characters');
  }, [nameInitials]);

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nickName.length === 0) return setNickNameError('Nick Name is required');
    if (nameInitials.length === 0)
      return setNameInitialsError('Name Initials is required');
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
        Updat{isFetching || isUpdating ? 'ing' : 'e'}
      </Button>
      <Button onClick={handleClick}>Home</Button>
    </>
  );
};

export default Profile;
