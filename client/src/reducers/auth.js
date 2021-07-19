import { AUTH,LOGOUT} from '../constants/actionTypes';


const authReducer = (state = { authData: null }, action) =>{ 

  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile',JSON.stringify({...action?.data}));

      return { ...state,authData: action?.data};

    case LOGOUT:
      localStorage.clear()
      return { ...state,authData: null};                //or .removeItem()            //this is LOGOUT

    //if you don't set logout seperately from default, it may run without you knowing it
    default:
      return state;
  }
};

export default authReducer;



//'profile' is the variable set to contained user profile data