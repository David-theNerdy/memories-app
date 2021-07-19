import React from 'react'
import  makeStyles  from "./styles"
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useState } from 'react'; 

import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import Icon from './icon'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Auth = () => {
    const classes = makeStyles();
    const [ isSignup, setIsSignup ] = useState(false)

    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSumit = (el) =>{
        el.preventDefault();
    }
    const handleChange = () =>{

    }
    const handleShowPassword = () =>{
        setShowPassword(!showPassword)
    }
    const handleShowConfirmPassword = () =>{
        setShowConfirmPassword(!showConfirmPassword)
    }
    const switchMode = () =>{
        setIsSignup(!isSignup)
    }

    const googleSuccess = (res) =>{             //still work without async
        const result = res?.profileObj;         //res.profileObj only may show: cannot get properties of undefined if the res obj don't exist; while ?. will show undefined
        const token = res?.tokenId;

        try{
            dispatch({ type: "AUTH", data: { result,token } });
           history.push("/")                    //history belong to react-router-dom, this will redirect to home after dispatch

        }catch(error){
            console.log(error)
        }
    }


    const googleFailure =() =>{
        console.log("error")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography variant="h5">{isSignup ? 'SIGN OUT' : 'SIGN IN'}</Typography>

                <form classsname={classes.form} onSubmit={handleSumit}>
                    <Grid container spacing={2}>
                        {
                        isSignup && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                            <Input name="firstName" label="Last Name" handleChange={handleChange} half/>
                            </>
                            )
                        }
                            <Input name="email" label="Email" handleChange={handleChange} type="email"  />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"}  handleShowPassword={handleShowPassword} />

                        {
                        isSignup && <Input name="confirmPassword" label="Confirm Password" type={showConfirmPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowConfirmPassword} />
                        }
                    </Grid>
                
                    <GoogleLogin 
                        clientId="251514563764-hpmekf90m9vr5aq1095srmoc6gdqk6gk.apps.googleusercontent.com"
                        render={(renderProps) =>(
                            <Button 
                            className={classes.googleButton} 
                            color="primary" fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                            startIcon={<Icon/>} 
                            variant="contained">
                                {isSignup? "Sign up with google" : "sign in with google"}
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Button type="summit" fullWidth variant="contained" color="primary" className={classes.button}> {isSignup ? "Sign UP" : "Sign In"}</Button>

                    <Grid container justify="flex-end">
                        <Grid item >
                        <Button onClick={switchMode}>{isSignup ? "Forgot your password?" : "Don't have an account? Sign up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>          
        </Container>
    )
}

export default Auth
