import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { strapiServer } from "api/strapi";
import { useAuthContext } from "hooks/useAuthContext";

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const putBusiness = async ({
    businessId,
    name,
  }: {
    businessId: number;
    name: string;
  }) => {
    const response = await axios.put(
      `${strapiServer}/businesses/${businessId}`,
      { data: { name } },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt}`,
        },
      }
    );
    return response.data;
  };

  const {
    mutate: updateBusiness,
    isLoading,
    isError,
  } = useMutation(putBusiness, {
    onSuccess: () => {
      queryClient.invalidateQueries(["business"]);
    },
  });

  return { updateBusiness, isLoading, isError };
};
