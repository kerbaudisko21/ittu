import { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
  isLogin: false,
};

export const IsLoginContext = createContext(INITIAL_STATE);

const IsLoginReducer = (state, action) => {
  switch (action.type) {
    case 'Login':
      return {
        isLogin: true,
      };
    case 'Register':
      return {
        isLogin: false,
      };

    default:
      return state;
  }
};

export const IsLoginContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(IsLoginReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <IsLoginContext.Provider
      value={{
        isLogin: state.isLogin,
        dispatch,
      }}
    >
      {children}
    </IsLoginContext.Provider>
  );
};
