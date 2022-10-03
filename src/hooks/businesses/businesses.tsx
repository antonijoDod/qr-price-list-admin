import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { strapiServer } from "api/strapi";
import { useAuthContext } from "hooks/useAuthContext";
import { TBusinesses } from "types/businesses";

/* Get all user businesses */
export const useGetBusinesses = () => {
  const { user } = useAuthContext();

  const getBusinesses = async () => {
    const response = await axios.get(`${strapiServer}/businesses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.jwt}`,
      },
    });
    return response.data;
  };

  const {
    data: businessesData,
    isLoading,
    isError,
    error,
  }: UseQueryResult<TBusinesses, Error> = useQuery<TBusinesses, Error>(
    ["businesses"],
    getBusinesses
  );
  return { businessesData, isLoading, isError, error };
};
