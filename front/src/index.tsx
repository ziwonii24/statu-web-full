import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore, { history } from './configureStore'
import { decode, login } from './components/User/authentication'
import { SET_USERINFO, setUserInfo } from './store/user';
import path from 'path'
import dotenv from 'dotenv'

import './styles/scss/index.scss'

dotenv.config({ path: path.join(__dirname, '.env') })

const store = configureStore()

const SERVER_IP = process.env.REACT_APP_TEST_SERVER  

const hasToken = () => {
  try {
    // 브라우저의 로컬스토리지에 이미 토큰이 있는지 체크
    const token = localStorage.getItem('token')
    console.log('*시작하자마자 토큰있다: ', token)
    
    if(!token) return   // 토큰 없으면 아무것도 안함

    // 토큰이 만료되엇는지?
    // fetch(`${SERVER_IP}/user/exp`, {
    //   method: 'GET',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'token': token
    //   }
    // }).then(res => {
    //   console.log(res)
    //   // 토큰 만료되었으면 리덕스에서 유저 정보 삭제하고 return (true가 만료된거)
    //   // store.dispatch(setUserInfo(null))
    // })

    // 토큰 기반으로 유저 정보를 리덕스 스토어에 저장
    const tokenDecoded = decode(token)
    login(token)
    store.dispatch(setUserInfo(tokenDecoded.user))

  } catch(e) {
    console.log(e)
  }
}

hasToken()

console.log('root index rendering...')

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
