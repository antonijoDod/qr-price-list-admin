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
import { useUploadImage, useDeleteImage } from "hooks/images";
import { TImage } from "types/businesses";

const BusinessesImage = ({
  businessId,
  businessImage,
  ...props
}: {
  businessId: number;
  businessImage: TImage;
}) => {
  const [img, setImg] = useState();
  const { uploadImage, isLoading, isError, error } = useUploadImage();
  const { deleteImage, isError: isErrorDeleteImage } = useDeleteImage();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    // @ts-ignore:next-line
    formData.append("files", img);
    formData.append("ref", "api::business.business");
    // @ts-ignore:next-line
    formData.append("refId", businessId);
    formData.append("field", "image");
    await uploadImage({ data: formData });
  };

  const handleDeleteImage = async () => {
    await deleteImage({ id: businessImage.id });
  };

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
            onClick={handleDeleteImage}
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
