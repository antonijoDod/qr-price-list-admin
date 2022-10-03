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
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import { useDeleteBusiness } from "hooks/businesses";
import { TBusiness } from "types/businesses";

const BusinessItem = ({ business }: { business: TBusiness }) => {
  const { deleteBusiness, isLoading, isError } = useDeleteBusiness();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleDeleteBusiness = async (id: number) => {
    await deleteBusiness(
      { id },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      }
    );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <TableRow key={business.id} hover>
        <TableCell>{business.attributes.name}</TableCell>
        <TableCell>{business.attributes.location}</TableCell>
        <TableCell>{business.attributes.phone}</TableCell>
        <TableCell>
          <IconButton
            component={Link}
            to={`/businesses/${business.id}`}
            aria-label="edit"
            color="info"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => setIsDialogOpen(true)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Delete business</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete business "{business.attributes.name}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>No</Button>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="error"
            onClick={() => handleDeleteBusiness(business.id)}
            autoFocus
          >
            Yes, delete
          </LoadingButton>
        </DialogActions>
        {isError && "Error is occurred"}
      </Dialog>
    </>
  );
};

export default BusinessItem;
