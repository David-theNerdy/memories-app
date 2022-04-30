import { START_LOADING, END_LOADING, FETCH_ORDERS} from '../constants/actionTypes';

export default (state = {isLoading:true, purchases :[]}, action) => {  
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true};
    case END_LOADING:
      return {...state, isLoading: false};  

    case FETCH_ORDERS:
        return {...state, purchases: action.payload.data };
    
    
    default:
      return state;
  }
};

