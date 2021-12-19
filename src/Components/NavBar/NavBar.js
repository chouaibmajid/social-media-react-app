import useStyles from "./styles";
import memories from "../../memories.png";
import {useDispatch , useSelector} from "react-redux";
import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const {dataProfil} = useSelector(state => state.Auth)
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profil")));

  const logout = () => {
    dispatch({ type: "Logout" });
    setUser(null);
    history.push("/");
  };
  const location = useLocation();
 

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profil")))
  },[dataProfil])
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
