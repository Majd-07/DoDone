import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
const link = {
  padding: "12px",
  margin: "0 6px 6px",
  textDecoration: "none",
  color: "#fff",
  display: "inline",
  fontWeight: "bold",
  fontSize: 17,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "row",
    paddingLeft: 30,
    zIndex: 0,
    backgroundColor: "#330033",
    color: "#fff",
    height: 36,
    alignItems: "center",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  // const handleDisplayLayoutChange = (event) => {
  // 	setState({ ...state, [event.target.name]: event.target.checked });
  // };

  return (
    <AppBar position="static" className={classes.root}>
      <NavLink to="/" style={link}>
        Boards
      </NavLink>

      <NavLink to="/about" style={link}>
        About
      </NavLink>

      {/* <Typography component='div'>
				<Grid component='label' container alignItems='center' spacing={1}>
					<Grid item>Off</Grid>
					<Grid item> */}
      {/* {<span style={{ color: 'white' }}>Off</span>}
			<Switch
				checked={state.checkedA}
				onChange={props.handleDisplayLayoutChange}
				name='checkedA'
				inputProps={{ 'aria-label': 'secondary checkbox' }}
			/>
			{<span style={{ color: 'white' }}>On</span>} */}
      {/* </Grid>
					<Grid item>On</Grid>
				</Grid>
			</Typography> */}
    </AppBar>
  );
};

export default Navbar;
