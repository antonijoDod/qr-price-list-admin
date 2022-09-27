import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "axios";
import { strapiServer } from "api/strapi";

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
