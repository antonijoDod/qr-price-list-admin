import { useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { useDeleteBusiness } from "hooks/businesses";
import { TBusinesses } from "types/businesses";
import BusinessItem from "./BusinessItem";

const BusinessList = ({ businesses, ...rest }: { businesses: TBusinesses }) => {
  return (
    <Card {...rest}>
      <Box>
        <Paper style={{ overflowX: "auto" }}>
          <Table style={{ minWidth: "340px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Business name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses.data?.length > 0 ? (
                businesses.data?.map((business) => (
                  <BusinessItem key={business.id} business={business} />
                ))
              ) : (
                <TableCell>Table is empty</TableCell>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Card>
  );
};

export default BusinessList;
