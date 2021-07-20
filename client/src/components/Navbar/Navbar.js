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
            ) : (
                <div className={classes.profile}>
                    <Button component={Link} to="/auth"variant="contained" color="primary">Sign In</Button>
                </div>
            )}
        </Toolbar>

    </AppBar>
    )
}

export default Navbar
