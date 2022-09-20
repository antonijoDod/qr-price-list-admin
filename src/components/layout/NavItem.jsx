import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, ListItem } from "@mui/material";

const NavItem = ({ href, icon, title, ...others }) => {
  /* const active = href ? router.pathname === href : false; */

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Button
        component={NavLink}
        to={href}
        startIcon={icon}
        style={({ isActive }) => ({
          color: isActive && "#43C6B7",
          background: isActive && "rgba(255,255,255, 0.08)",
          fontWeight: isActive && "bold",
        })}
        disableRipple
        sx={{
          borderRadius: 1,
          color: "neutral.300",
          justifyContent: "flex-start",
          px: 3,
          textAlign: "left",
          textTransform: "none",
          width: "100%",
          "& .MuiButton-startIcon": {
            color: "neutral.400",
          },
          "&:hover": {
            backgroundColor: "rgba(255,255,255, 0.08)",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default NavItem;
