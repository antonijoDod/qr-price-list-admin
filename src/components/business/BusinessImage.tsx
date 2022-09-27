import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";

import { strapiServer } from "api/strapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BusinessesImage = ({
  businessId,
  businessImage,
  ...props
}: {
  businessId: number;
  businessImage: any;
}) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const [img, setImg] = useState();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    // @ts-ignore:next-line
    formData.append("files", img);
    formData.append("ref", "api::business.business");
    // @ts-ignore:next-line
    formData.append("refId", businessId);
    formData.append("field", "image");
    await mutate({ data: formData });
  };

  const postImage = async ({ data }: { data: any }) => {
    const response = await axios.post(`${strapiServer}/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.jwt}`,
      },
    });
    return response.data;
  };

  const { mutate, isLoading } = useMutation(postImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["business"]);
    },
  });

  const deleteImage = () => {};

  return (
    <Card {...props}>
      {!businessImage ? (
        <CardMedia
          component="img"
          height="194"
          image="/assets/images/placeholder.png"
          alt="Business image"
        />
      ) : (
        <CardMedia
          component="img"
          height="194"
          image={
            businessImage.attributes.formats.small
              ? businessImage.attributes.formats.small.url
              : businessImage.attributes.formats.thumbnail.url
          }
          alt="Business image"
        />
      )}

      <Divider />
      <CardActions>
        {businessImage ? (
          <Button
            onClick={deleteImage}
            type="submit"
            color="primary"
            fullWidth
            variant="text"
          >
            Delete picture
          </Button>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              type="file"
              name="files"
              // @ts-ignore:next-line
              onChange={(e) => setImg(e.target.files[0])}
            />
            <Button type="submit" color="primary" fullWidth variant="text">
              Upload picture
            </Button>
          </form>
        )}
      </CardActions>
    </Card>
  );
};

export default BusinessesImage;
