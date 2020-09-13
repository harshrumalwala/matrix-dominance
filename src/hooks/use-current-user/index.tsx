import React, { FC, useState, createContext, useContext } from 'react';

import { auth } from 'services';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: true,
};

const CurrentUserContext = createContext<{
  currentUser: firebase.User | null;
  isLoading: boolean;
}>(INITIAL_STATE);

export const CurrentUserProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  auth.onAuthStateChanged((user) => {
    user ? setCurrentUser(user) : setCurrentUser(null);
    setIsLoading(false);
  });

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: currentUser, isLoading: isLoading }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
