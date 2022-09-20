import React, { useEffect, createContext, ReactNode, useReducer } from "react";

type TUser = {
  id: number;
  username: string;
  email: string;
};

export type TUserInfo = {
  jwt: string;
  user: TUser;
};

export type TAuthContext = {
  user: TUserInfo | null;
  dispatch: React.Dispatch<LoginAction>;
};

type TUserState = {
  user: TUserInfo | null;
};

type LoginAction = { type: "LOGIN"; payload: TUserInfo } | { type: "LOGOUT" };

const initialState = {
  user: null || JSON.parse(localStorage.getItem("user")!),
  dispatch: () => undefined,
};

const AuthContext = createContext<TAuthContext>(initialState);

export const authReducer = (state: TUserState, action: LoginAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export { AuthContext };
