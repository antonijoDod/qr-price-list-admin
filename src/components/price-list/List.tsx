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
} from "@mui/material";
import { useGetCategory } from "hooks/useCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListAccordion from "./ListAccordion";

const List = ({ categories }: { categories: any }) => {
  if (categories.data.length === 0) return <>Empty</>;

  return (
    <MuiList>
      {categories.data.map((category: any) => (
        <ListAccordion key={category.id} category={category} />
      ))}
    </MuiList>
  );
};

export default List;
