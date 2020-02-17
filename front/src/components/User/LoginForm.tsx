import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import { UserInput, TokenInfo, GoogleTokenInfo } from './interfaces/UserInfo.interface'
import useUser from '../../hooks/useUser'

import { login, decode, decode_google } from './authentication'

import { history } from '../../configureStore'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login';


import './styles/Auth.scss'

dotenv.config({ path: path.join(__dirname, '.env') })

const Login: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER  

    const [ userEmail, setUserEmail ] = useState<string>('')  
    const [ userPass, setUserPass ] = useState<string>('')
    const [ error, setError ] = useState<string>('')
    const userInput: UserInput = {
        'email': userEmail,
        'password': userPass,
    }
    const { onGetUserInfo, onSetUserInfo } = useUser()

    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value)
    }

    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPass(e.target.value)
    }

    const loginSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        fetch(`${SERVER_IP}/user/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userInput)
        }).then(res => {
            res.json().then(response => {
               
                const token = response.data.token
                const tokenDecoded = decode(token)
                const user = tokenDecoded.user

                console.log('user: ', user)                

                if(user.statusCode !== 'use') {
                    setError('이메일 인증을 해주세요.')
                } else {
                    login(token)
                    onSetUserInfo(user)

                    if(user.category1[0] == '') {
                        alert('환영합니다! 카테고리 설정을 먼저 해주세요!')
                        history.push('/user')
                    } else {
                        history.push('/')
                    }
                }                
            })
            .catch(e => {
                console.log('error: ', e)
                setError('아이디 또는 비밀번호가 틀립니다.')
            })
        })
    }

    const responseGoogle = (result: any) => {
        console.log('g token: ', result.tokenId)
        const googleTokenDecoded: GoogleTokenInfo = decode_google(result.tokenId)
        console.log('g token decoded: ', googleTokenDecoded)
        console.log('g email: ', googleTokenDecoded.email)
        console.log('g name : ', googleTokenDecoded.name)

        const googleUser: GoogleTokenInfo = {
            'email': googleTokenDecoded.email,
            'name' : googleTokenDecoded.name            
        }

        fetch(`${SERVER_IP}/user/social`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(googleUser)
        }).then(res => {
            console.log('[user/social] res : ', res)
            res.json().then(response => {
                console.log('[user/social] response : ', response)
               
                const token = response.data.token
                const tokenDecoded = decode(token)
                const user = tokenDecoded.user

                console.log('[user/social] user: ', user)    
                
                login(token)
                onSetUserInfo(user)
                
                if(user.category1 == null || user.category1[0] == '') {
                    alert('환영합니다! 카테고리 설정을 먼저 해주세요!')
                    history.push('/user')
                } else {
                    history.push('/')
                }            
            })
            .catch(e => {
                console.log('[user/social] res error: ', e)
            })
        })
        .catch(e => {
            console.log('[user/social] response error: ', e)
        })
    }

    return (
        <div className='whiteBox'>
            <h4 className='formTitle'>로그인</h4>
            <form>
                <div>
                    <input className='inputAuth' type='text' placeholder='이메일' value={userEmail} onChange={handleEmailInputChange}/>
                </div>
                <div>
                    <input className='inputAuth' type='password' placeholder='비밀번호' value={userPass} onChange={handlePasswordInputChange}/>
                </div>
                { error && <div className='errorMsg'>{error}</div> }
                <div>
                    <button className='btnSubmit' type='submit' onClick={loginSubmitHandler}>로그인</button>
                </div>
                <hr></hr>
                <div className='socialLoginBox'>
                    <GoogleLogin
                        clientId="654444794659-7o99n8c7getq7eq2hrja5eveijqsbs15.apps.googleusercontent.com"
                        buttonText="Google 로그인하기"
                        className={'socialLoginGoogle'}
                        onSuccess={result => responseGoogle(result)}
                        onFailure={result => console.log('e: ', result)}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </form>
            <div className='authFooter'>
                <Link to='/signup'>회원가입</Link>
            </div>
        </div>
    )
}

export default Login