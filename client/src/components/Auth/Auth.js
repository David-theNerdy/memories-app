<<<<<<< HEAD
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

import { signin, signup } from '../../actions/auth'


const initialState = {firstName:'', lastName:'', email:'', password:'', comfirmPassword:''}

const Auth = () => {
    const classes = makeStyles();
    const [ isSignup, setIsSignup ] = useState(false)
    const [ formData, setFormData ] = useState(initialState)
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSumit = (el) =>{
        el.preventDefault();
        
        if(!isSignup){
            //check with database
            dispatch(signin(formData, history))             //include history to navigate user later on
        }else{
            //create new user
            dispatch(signup(formData, history))
        }

    }
    const handleChange = (el) =>{
        setFormData({...formData, [el.target.name] : el.target.value })
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
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
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
=======
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
{/*alternative for ggLogin: 251514563764-hpmekf90m9vr5aq1095srmoc6gdqk6gk.apps.googleusercontent.com */}
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
