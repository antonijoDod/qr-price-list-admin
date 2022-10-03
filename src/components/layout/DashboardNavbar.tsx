import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import AccountPopover from "./Account-popover";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuthContext } from "hooks/useAuthContext";

const DashboardNavbarRoot = styled(AppBar)(({ theme }: { theme?: any }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const DashboardNavbar = ({
  onSidebarOpen,
  ...other
}: {
  onSidebarOpen: () => void;
}) => {
  const { user } = useAuthContext();
  const settingsRef = useRef(null);

  const [isOpenAccountPopover, setIsOpenAccountPopover] =
    useState<boolean>(false);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            onClick={() => setIsOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              height: 40,
              width: 40,
              ml: 1,
              backgroundColor: "#673AB7",
              cursor: "pointer",
            }}
          >
            {user?.user.username[0].toUpperCase()}
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={isOpenAccountPopover}
        onClose={() => setIsOpenAccountPopover(false)}
      />
    </>
  );
};

export default DashboardNavbar;
