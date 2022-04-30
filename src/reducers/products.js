import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_PRODUCT} from '../constants/actionTypes';

export default (state = {isLoading:true, products :[]}, action) => {  
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true};
    case END_LOADING:
      return {...state, isLoading: false};  
    case FETCH_ALL:
      return {...state, products : action.payload.data, currentPage: action.payload.currentPage, numberOfPages : action.payload.numberOfPages};
    case FETCH_BY_SEARCH:
      return {...state, products : action.payload}; 
    case FETCH_PRODUCT:
      // console.log({...state, product : action.payload})
      // console.log(state)
      return {...state, product : action.payload}; 
    case LIKE:
      return { ...state, products: state.products.map((product) => (product._id === action.payload._id ? action.payload : product)) };
    case CREATE:
      return { ...state, products:[...state, action.payload]};
    case UPDATE:
      return { ...state, products: state.products.map((product) => (product._id === action.payload._id ? action.payload : product)) };
    case DELETE:
      return { ...state, products: state.products.filter((product) => product._id !== action.payload) };
    default:
      return state;
  }
};

