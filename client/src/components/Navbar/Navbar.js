import React from 'react'
import memories from '../../images/memories.png';
import makeStyles from './styles';
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core';
import { Link } from "react-router-dom"

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


const Navbar = () => {
    const classes = makeStyles();  //Why useStyles works??

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () =>{
        dispatch({type: 'LOGOUT'});
        history.push("/");
        setUser(null);
        console.log('a')
    }

    useEffect(()=>{
        const token = user?.token;

        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])


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
            ) :(
                <div className={classes.profile}>
                    <Button component={Link} to="/auth"variant="contained" color="primary">Sign In</Button>
                </div>
            )}
        </Toolbar>

    </AppBar>
    )
}

export default Navbar
