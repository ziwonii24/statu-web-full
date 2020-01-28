import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import configureStore, { history } from './configureStore'
// import rootReducer from './store/reducerIndex'
// import createSagaMiddleware from 'redux-saga'

// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(
//   rootReducer,
//   applyMiddleware(sagaMiddleware)
//   )

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
