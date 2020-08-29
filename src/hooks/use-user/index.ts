import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { db } from 'services';
import { UserOutput, User } from 'typings';

const useUser = (): UserOutput => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [user, setUser] = useState<User | undefined>();
  const { userId }: { userId: string } = useParams();

  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(userId)
      .onSnapshot((doc) => {
        doc.exists
          ? setUser(doc.data() as User)
          : console.log('User not found');
        setIsFetching(false);
      });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return { isFetching, user };
};

export default useUser;
