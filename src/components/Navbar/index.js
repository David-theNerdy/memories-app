import React from 'react'

import makeStyles from './styles';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import { Link } from "react-router-dom"

import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import decode from 'jwt-decode'

const Navbar = () => {   
    const classes = makeStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = useCallback(() => {
        // localStorage.removeItem('token');
        // localStorage.removeItem('profiler');
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        window.location.reload(); //the old version is history.push('/'), this cause a error when user log in, refresh the page, log out, then SIGN IN button doesn't work, I have no idea why it happens 
    }, [dispatch]);

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp < Date.now()/1000) handleLogout();
        }
    } , [location]);

    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
            TROPICAL of C
        </Link>


        <Toolbar className={classes.toolbar}>
            <div className={classes.profile}>
                <Button component={Link} to="/orders" variant="contained" color="primary">Orders</Button>
            </div>
            
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0) + user.result.name.charAt(1)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" color="secondary" onClick={handleLogout}>Log Out</Button>
                </div>
            ) : (location.pathname==="/auth") ?  <></> :(
                <div className={classes.profile}>
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                </div>
            ) }
        </Toolbar>
    </AppBar>
    )
}

export default Navbar
