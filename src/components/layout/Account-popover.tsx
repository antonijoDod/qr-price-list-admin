import React from "react";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useAuthContext } from "hooks/useAuthContext";
import { useLogout } from "hooks/useLogout";

const AccountPopover = ({
  anchorEl,
  onClose,
  open,
  ...other
}: {
  anchorEl: any;
  onClose: () => void;
  open: boolean;
}) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.user.username}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={() => logout()}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
