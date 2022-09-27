import React from "react";
import { useParams } from "react-router-dom";
import { useGetBusiness } from "hooks/businesses";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import BusinessImage from "components/business/BusinessImage";
import BusinessEdit from "components/business/BusinessEditForm";

const Business = () => {
  const { id } = useParams();

  const { businessData, isLoading, isError } = useGetBusiness(
    typeof id === "string" ? parseInt(id) : 0
  );

  if (isLoading) return <>Loading</>;

  if (isError) return <>Error is ocurred</>;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography variant="h4" mb={3}>
            Business details
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <BusinessImage
              businessId={businessData.data.id}
              businessImage={
                businessData.data.attributes.image.data
                  ? businessData.data.attributes.image.data
                  : null
              }
            />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <Card>
              <CardHeader
                title="Business details"
                subheader="The information can be edited"
              />
              <Divider />
              <CardContent>
                <BusinessEdit businessData={businessData} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Business;
