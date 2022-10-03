import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthContext } from 'hooks/useAuthContext'
import axios from 'axios'
import { strapiServer } from 'api/strapi'

export const useDeleteImage = () => {
    const queryClient = useQueryClient()
    const { user } = useAuthContext()

    const postImage = async ({ id }: { id: number }) => {
        const response = await axios.delete(`${strapiServer}/upload/files/${id}`, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user?.jwt}`,
            },
        });
        return response.data;
    };

    const { mutate: deleteImage, isLoading, isError, error } = useMutation(postImage, {
        onSuccess: () => {
            queryClient.invalidateQueries(["business"]);
        },
    });

    return { deleteImage, isLoading, isError, error }
}