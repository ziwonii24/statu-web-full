import React from 'react';
import ReactDOM from 'react-dom';
import './styles/scss/index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'

import configureStore, { history } from './configureStore'
// 로그인 상태인지 아닌지 체크하는 store값? 필요
// import { tempSetUser, check } from './store/auth/user';

const store = configureStore()

// function loadUser() {
//   try {
//     const user = localStorage.getItem('user');
//     if (!user) return; // 로그인 상태가 아니라면 아무것도 안함

//     store.dispatch(tempSetUser(user));
//     store.dispatch(check());
//   } catch (e) {
//     console.log('localStorage is not working');
//   }
// }

// loadUser()

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
