import { useMutation } from "@tanstack/react-query";
import { signUpService } from "services/userServices";
import { useNavigate } from "react-router-dom";

type TSignUpForm = {
  username: "string";
  email: "email";
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

export const useSignUp = () => {
  const navigate = useNavigate();

  const {
    mutate: signUp,
    isLoading,
    isError,
    error,
  } = useMutation<TAxiosResponse, TCreateUserError, TSignUpForm>(
    signUpService,
    {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    }
  );

  return { signUp, isLoading, isError, error };
};
