import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import { palette, spacing, typography } from "@material-ui/system";

const link = {
  textDecoration: "none",
  color: "white",
  marginLeft: "10px",
  marginRight: "20px",
  fontSize: "18px",
  fontWeight: "bold",
  color: "black",
};

const Navbar = () => (
  <AppBar position="static" color="white" display="inline-block">
    <List display="inline-block">
      <NavLink to="/" style={link}>
        Boards
      </NavLink>

      <NavLink to="/about" style={link}>
        About
      </NavLink>
    </List>
  </AppBar>
);

export default Navbar;
