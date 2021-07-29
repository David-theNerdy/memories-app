import { combineReducers } from 'redux';

import posts from './posts';
<<<<<<< HEAD
import authReducer from './auth';

export const reducers = combineReducers({ posts, authReducer });
=======
import auth from './auth';

export const reducers = combineReducers({ posts, auth });
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)
