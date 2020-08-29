import React, { FC, useState, createContext, useContext } from 'react';

import { auth } from 'services';

const CurrentUserContext = createContext<firebase.User | null>(null);

export const CurrentUserProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  auth.onAuthStateChanged(setCurrentUser);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
