import { combineReducers } from 'redux';

import products from './products';
import authReducer from './auth';
import purchases from './purchases';

export const reducers = combineReducers({ products, authReducer, purchases });