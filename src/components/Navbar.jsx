import React from "react";
import { NavLink } from "react-router-dom";
import ColumnsFilter from "./ColumnsFilter";

const link = {
  padding: "12px",
  margin: "0 6px 6px",
  textDecoration: "none",
  color: "white",
};

const Navbar = () => (
  <div className="Navbar">
    <NavLink to="/" style={link}>
      Boards
    </NavLink>

    <NavLink to="/about" style={link}>
      About
    </NavLink>
    <ColumnsFilter />
  </div>
);

export default Navbar;
