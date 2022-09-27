import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { strapiServer } from "api/strapi";
import { useAuthContext } from "hooks/useAuthContext";

/* Delete user business */

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const deleteUserBusiness = async ({ id }: { id: number }) => {
    const response = await axios.delete(`${strapiServer}/businesses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.jwt}`,
      },
    });

    return response.data;
  };

  const {
    mutate: deleteBusiness,
    isLoading,
    isError,
  } = useMutation(deleteUserBusiness, {
    onSuccess: () => {
      queryClient.invalidateQueries(["businesses"]);
    },
  });

  return { deleteBusiness, isLoading, isError };
};
