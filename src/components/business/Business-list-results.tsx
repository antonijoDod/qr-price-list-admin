import React from "react";
import { format } from "date-fns";
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
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { useDeleteBusiness } from "hooks/useBusiness";

const BusinessListResults = ({ businesses, ...rest }: { businesses: any }) => {
  const { deleteBusiness, isLoading, isError } = useDeleteBusiness();

  const handleDeleteBusiness = async (id: number) => {
    await deleteBusiness({ id });
  };

  return (
    <Card {...rest}>
      <Box>
        <Paper style={{ overflowX: "auto" }}>
          <Table style={{ minWidth: "340px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Business name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businesses.data?.length > 0 ? (
                businesses.data.map((business: any) => (
                  <TableRow key={business.id} hover>
                    <TableCell>{business.name}</TableCell>
                    <TableCell>kod@pere.com</TableCell>
                    <TableCell>Ballyconnell, Co. Cavan</TableCell>
                    <TableCell>78575785</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" color="info">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDeleteBusiness(business.id)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell>Table is empty</TableCell>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
      {/*  <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

export default BusinessListResults;
