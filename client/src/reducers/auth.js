<<<<<<< HEAD
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
=======
import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
    default:
      return state;
  }
};

export default authReducer;
<<<<<<< HEAD



//'profile' is the variable set to contained user profile data
=======
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
