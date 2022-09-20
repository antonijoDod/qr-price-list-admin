import React, { useState } from "react";
import {
  List as MuiList,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useGetCategory } from "hooks/useCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ItemList = ({ items }: { items: any }) => {
  return (
    <MuiList>
      {items.map((item: any) => (
        <ListItem>
          <ListItemText primary={item.attributes.name} secondary="dsf" />
        </ListItem>
      ))}
    </MuiList>
  );
};

const ListAccordion = ({ category }: { category: any }) => {
  const [categoryId, setCategoryId] = useState<number | null>();
  const { categoryData, isError, isLoading, status, fetchStatus } =
    useGetCategory(categoryId as number);

  const handleOpenAccordion = (expanded: boolean) => {
    if (expanded === true) {
      setCategoryId(category.id);
    }
  };

  return (
    <Accordion onChange={(e, expanded) => handleOpenAccordion(expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{category.attributes.name}</Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          "Loading"
        ) : (
          <ItemList items={categoryData.data.attributes.items?.data} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ListAccordion;
