import React from 'react'
import  makeStyles  from "./styles"
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useState } from 'react'; 

import Input from './input'
import { GoogleLogin } from 'react-google-login'
import Icon from './icon'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signin, signup } from '../../actions/auth'

const initialState = {firstName:'', lastName:'', email:'', password:'', comfirmPassword:''}

const Auth = () => {

    const classes = makeStyles()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const [ isSignup, setIsSignup ] = useState(false)

    const switchMode = () =>{
        setIsSignup(!isSignup)
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowConfirmPassword = () =>{
        setShowConfirmPassword(!showConfirmPassword)
    }
    const handleSumit = (e) => {
        e.preventDefault()

        if(!isSignup){
            //check with database
            dispatch(signin(formData, history))             //include history to navigate user later on
        }else{
            if(formData.password != formData.comfirmPassword){
                console.log(formData)
                alert('Password and Confirm Password must be the same')
                return
            }
            if(formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.password === '' || formData.comfirmPassword === ''){
                alert('All fields are required')
                return
            }
            if(formData.password.length < 6){
                alert('Password must be at least 6 characters')
                return
            }
            //create new user
            dispatch(signup(formData, history))
        }
    }

    const googleSuccess = (res) =>{             //still work without async
        const result = res?.profileObj;         //res.profileObj only may show: cannot get properties of undefined if the res obj don't exist; while ?. will show undefined
        const token = res?.tokenId;
        console.log(result)
        console.log(token)
        try{
            dispatch({ type: "AUTH", data: { result,token } });
            
            window.history.go('/')                    //history of react-router-dome is decrepicated 
        }catch(error){
            console.log(error)
        }
    }
    

    const googleFailure = (res) =>{
       console.log(res)
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Typography>
                <form classsname={classes.form} onSubmit={handleSumit}>
                    <Grid container spacing={2}>
                        {
                        isSignup && (
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                            )
                        }
                            <Input name="email" label="Email" handleChange={handleChange} type="email"  />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"}  handleShowPassword={handleShowPassword} />

                        {
                        isSignup && <Input name="comfirmPassword" label="Confirm Password" type={showConfirmPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowConfirmPassword} />
                        }
                    </Grid>
                
                    <GoogleLogin 
                        clientId="935293012203-lq75ip8vhlr9b4rimap2611drc82gh1b.apps.googleusercontent.com"
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

                    <Grid container justifyContent="flex-end">
                        <Grid item >
                        <Button onClick={switchMode}>{isSignup ? "Forgot your password?" : "Don't have an account? Sign up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>

                    
    )
}

export default Auth