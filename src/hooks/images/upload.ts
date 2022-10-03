import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from 'hooks/useAuthContext'
import axios from 'axios'
import { strapiServer } from 'api/strapi'

export const useUploadImage = () => {
    const queryClient = useQueryClient()
    const { user } = useAuthContext()

    const postImage = async ({ data }: { data: any }) => {
        const response = await axios.post(`${strapiServer}/upload`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user?.jwt}`,
            },
        });
        return response.data;
    };

    const { mutate: uploadImage, isLoading, isError, error } = useMutation(postImage, {
        onSuccess: () => {
            queryClient.invalidateQueries(["business"]);
        },
    });


    return { uploadImage, isLoading, isError, error }
}