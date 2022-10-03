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
    short_name,
    location,
    phone,
    description,
  }: {
    businessId: number;
    name: string;
    short_name: string;
    location: string;
    phone: string;
    description: string;
  }) => {
    const response = await axios.put(
      `${strapiServer}/businesses/${businessId}`,
      { data: { name, short_name, location, phone, description } },
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
