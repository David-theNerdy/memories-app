import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';

<<<<<<< HEAD
const store = createStore(reducers, compose(applyMiddleware(thunk)));
=======
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
>>>>>>> 429ba36 (fix bugs, make fully responsive, add new features)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
