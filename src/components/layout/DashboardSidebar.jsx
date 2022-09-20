import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QrCodeIcon from "@mui/icons-material/QrCode";
import GridViewIcon from "@mui/icons-material/GridView";
import NavItem from "./NavItem";
import Logo from "../Logo";

const items = [
  {
    href: "/",
    icon: <GridViewIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/business",
    icon: <AddBusinessIcon fontSize="small" />,
    title: "Business",
  },
  {
    href: "/price-list",
    icon: <MenuBookIcon fontSize="small" />,
    title: "Price list",
  },
];

const options = [
  {
    href: "/qr-builder",
    icon: <QrCodeIcon fontSize="small" />,
    title: "Qr builder",
  },
];

const DashboardSidebar = ({ open, onClose }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ pt: 3, pl: 3 }}>
            <Link to="/">
              <Logo
                sx={{
                  height: 42,
                }}
              />
            </Link>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
          <Divider sx={{ my: 3 }} />
          {options.map(({ title, icon, href }) => (
            <NavItem key={title} icon={icon} href={href} title={title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Need more features?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="Go to pro" src="/static/images/sidebar_pro.png" />
          </Box>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
