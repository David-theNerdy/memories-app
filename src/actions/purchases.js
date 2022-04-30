import { 
    START_LOADING, 
    END_LOADING, 
    FETCH_ORDERS
  } from '../constants/actionTypes';

  import * as api from '../api/index.js'; 

  export const getOrders = () => async (dispatch) => {
    try{
      dispatch({ type: START_LOADING})
      await api.fetchOrders()
      .then(res => dispatch({ type: FETCH_ORDERS, payload: res}))
      .then(res => console.log(res.payload.data));
      dispatch({ type: END_LOADING})
    }catch (error) {
      console.log(error.message);
    }
  }
  