import { useEffect, useState } from 'react';
import _ from 'lodash';
import { db } from 'services';
import { UsersOutput, User } from 'typings';

const useUsers = (userIds: Array<string> | undefined): UsersOutput => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [users, setUsers] = useState<{ [key: string]: User } | undefined>();

  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((querySnapshot) => {
      let userList: { [key: string]: User } = {};
      querySnapshot.forEach((doc) => {
        if (_.includes(userIds, doc.id))
          userList = _.merge(userList, { [doc.id]: doc.data() as User });
      });
      setUsers(userList);
      setIsFetching(false);
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(userIds)]);

  return { isFetching, users };
};

export default useUsers;
