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

const BusinessesImage = ({
  businessImage,
  ...props
}: {
  businessImage: any;
}) => {
  const { user } = useAuthContext();
  const [img, setImg] = useState();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    // @ts-ignore:next-line
    formData.append("files", img);
    formData.append("ref", "api::business.business");
    formData.append("refId", "82");
    formData.append("field", "image");
    const response = await axios.post(`${strapiServer}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.jwt}`,
      },
    });
    console.log(
      "🚀 ~ file: BusinessImage.tsx ~ line 39 ~ handleFormSubmit ~ response",
      response
    );
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
              : businessImage.attributes.url
          }
          alt="Business image"
        />
      )}

      <Divider />
      <CardActions>
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
      </CardActions>
    </Card>
  );
};

export default BusinessesImage;
