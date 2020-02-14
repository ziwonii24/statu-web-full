import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore, { history } from './configureStore'
import { getToken, decode, login, logout } from './components/User/authentication'
import { SET_USERINFO, setUserInfo } from './store/user';
import path from 'path'
import dotenv from 'dotenv'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/scss/index.scss'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER  
const store = configureStore()

const hasToken = async () => {
  try {
    // 브라우저의 로컬스토리지에 이미 토큰이 있는지 체크
    const token = getToken()
    console.log('*시작하자마자 토큰있다: ', token)
    
    // 유효한 토큰이 없으면 아무것도 안함
    if(!token) return
    
    // fetch(`${SERVER_IP}/user/exp`, {
    //   method: 'GET',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'token': token,
    //   }
    // }).then(res => {
    //   console.log('토큰 만료 결과 : ', res)
      
    // }).catch(e => {
    //   console.log(e)
    // })
        
    // 토큰 기반 자동 로그인
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
