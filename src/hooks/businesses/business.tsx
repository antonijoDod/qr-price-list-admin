import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { strapiServer } from "api/strapi";
import { useAuthContext } from "hooks/useAuthContext";

// Get business by id
export const useGetBusiness = (businessId: number) => {
  const { user } = useAuthContext();

  const getBusiness = async (id: number) => {
    const response = await axios.get(
      `${strapiServer}/businesses/${id}?populate=*`,
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
    data: businessData,
    isLoading,
    isError,
    status,
  } = useQuery(["business", businessId], () => getBusiness(businessId), {
    enabled: !!businessId,
  });

  return { businessData, isLoading, status, isError };
};
