import { useMutation } from "@tanstack/react-query";
import { loginService } from "services/userServices";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

type TForm = {
  identifier: "string";
  password: "string";
};

type TAxiosResponse = {
  data: {
    jwt: string;
    user: {
      id: number;
      email: string;
      username: string;
    };
  };
};

type TCreateUserError = {
  response: {
    data: {
      error: {
        status: number;
        name: string;
        message: string;
      };
    };
  };
};

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    isError,
    error,
  } = useMutation<TAxiosResponse, TCreateUserError, TForm>(loginService, {
    onSuccess: ({ data }) => {
      // Save user data to AuthContext, example: user: {jwt: "xxxxx", user: {id: 1, username: "Marco"}}
      dispatch({ type: "LOGIN", payload: data });
      // Save user in localstorage
      localStorage.setItem("user", JSON.stringify(data));
      // After successfully login redirect
      navigate("/", { replace: true });
    },
  });
  return { login, isLoading, isError, error };
};
