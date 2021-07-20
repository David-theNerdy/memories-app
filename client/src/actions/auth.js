import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async (dispatch) =>{

    try{
        //log user in: check with the backend data
        const { data } = await api.signIn(formData);

        dispatch({type: AUTH, data})

        history.push('/')
    }catch(er){
        console.log(er)
    }
}

export const signup = (formData, history) => async (dispatch) =>{  //????

    try{
        //create new user in backend
        const { data } = await api.signUp(formData);
        dispatch({type: AUTH, data})
        history.push('/')
    }catch(er){
        console.log(er)
    }
}





































