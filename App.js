import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Router from './src/Router.js';
import { UserSessionContext } from './src/Context.js'

export default function App() {
  const [userSession, setUserSession] = useState(false);

  useEffect(async () => {
    const session = await AsyncStorage.getItem('user_session');
    setUserSession(session !== null);
  }, [])

  return (
    <>
      <UserSessionContext.Provider value={{
        isLogged: userSession,
        handleIsLogged: (value) => {
          setUserSession(value);
        },
      }}
      >
        <Router />
      </UserSessionContext.Provider>
    </>
  )
}