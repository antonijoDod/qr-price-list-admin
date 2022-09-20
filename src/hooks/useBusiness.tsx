import { createBusinessServices } from "services/business";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { strapiServer } from "api/strapi";
import { useAuthContext } from "hooks/useAuthContext";

/* Get user businesses */
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
  } = useQuery(["businesses"], getBusinesses);
  return { businessesData, isLoading, isError, error };
};

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

/* Create user business */
export const useCreateBusiness = () => {
  const queryClient = useQueryClient();

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

/* Delete business */
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
