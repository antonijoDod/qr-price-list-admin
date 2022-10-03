import React, { useEffect, useState } from "react";
import {
  List as MuiList,
  ListItem,
  IconButton,
  Box,
  ListItemText,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useGetCategory } from "hooks/categories";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryItem from "components/price-list/CategoryItem";
import { useGetBusiness } from "hooks/businesses";

const CategoriesList = ({ businessId }: { businessId: number }) => {
  const { businessData, isError, isLoading } = useGetBusiness(businessId);
  console.log(
    "🚀 ~ file: CategoriesList.tsx ~ line 24 ~ CategoriesList ~ businessData",
    businessData
  );

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <MuiList>
      {businessData?.attributes.categories.data.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </MuiList>
  );
};

export default CategoriesList;
