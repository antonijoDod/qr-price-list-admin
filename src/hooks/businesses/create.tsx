import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { strapiServer } from "api/strapi";
import { useAuthContext } from "hooks/useAuthContext";

/* Create user business */

type TCreateBusiness = {
  name: "string";
  phone: "number";
};

export const useCreateBusiness = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const createBusinessServices = async ({ name, phone }: TCreateBusiness) =>
    await axios.post(
      `${strapiServer}/businesses`,
      {
        data: {
          name,
          phone,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt}`,
        },
      }
    );

  const {
    mutate: createBusiness,
    isLoading,
    isError,
    error,
  } = useMutation(createBusinessServices, {
    onSuccess() {
      queryClient.invalidateQueries(["businesses"]);
    },
  });

  return { createBusiness, isLoading, isError, error };
};
