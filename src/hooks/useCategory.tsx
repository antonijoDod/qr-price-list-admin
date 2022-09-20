import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import { strapiServer } from "api/strapi";

type TCreateCategory = {
  name: string;
  businessId: number;
};

// Get specific category by id
export const useGetCategory = (categoryId: number) => {
  const { user } = useAuthContext();

  const getCategory = async (id: number) => {
    const response = await axios.get(
      `${strapiServer}/categories/${id}?populate=*`,
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
    data: categoryData,
    isLoading,
    isError,
    status,
    fetchStatus,
  } = useQuery(["category", categoryId], () => getCategory(categoryId), {
    enabled: !!categoryId,
  });

  return { categoryData, isLoading, isError, status, fetchStatus };
};

// Create a new category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const postCategory = async ({ name, businessId }: TCreateCategory) => {
    const response = await axios.post(
      `${strapiServer}/categories`,
      {
        data: {
          name,
          business: businessId,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.jwt}`,
        },
      }
    );
    return response.data;
  };

  const { mutate: createCategory } = useMutation(postCategory, {
    onSuccess: () => queryClient.invalidateQueries(["business"]),
  });

  return { createCategory };
};
