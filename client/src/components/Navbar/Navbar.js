<<<<<<< HEAD
import React from 'react'
import memories from '../../images/memories.png';
import makeStyles from './styles';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import { Link } from "react-router-dom"

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import decode from 'jwt-decode'

const Navbar = () => {
    const classes = makeStyles();  //Why useStyles works??

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile'))); //convert to object
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const logout = () =>{
        dispatch({type: 'LOGOUT'});
        history.push("/");
        setUser(null);
    }

    useEffect(()=>{
        const token = user?.token;

        //JWT check if token expired
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp*1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    //Check the token expire: why is it related to location?
    //Maybe because every action user took, we change path to make request

    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
        <Typography component={Link} to="/"  className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
        </div>

        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0) + user.result.name.charAt(1)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" color="secondary" onClick={logout}>Log Out</Button>
                </div>
            ) : (location.pathname==="/auth") ?  <></> :(
                <div className={classes.profile}>
                    <Button component={Link} to="/auth"variant="contained" color="primary">Sign In</Button>
                </div>
            ) }
        </Toolbar>

    </AppBar>
    )
}

export default Navbar
=======
import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = useCallback(() =>{
    dispatch({type: 'LOGOUT'});
    setUser(null);
    window.location.reload();               //the old version is history.push('/'), this cause a error when user log in, refresh the page, log out, then SIGN IN button doesn't work, I have no idea why it happens 
},[dispatch]) 

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
