import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import path from 'path'
import dotenv from 'dotenv'

import { UserInput } from './interfaces/UserInfo.interface'
import useUser from '../../hooks/useUser'

import { login, decode } from './authentication'

import { history } from '../../configureStore'
import { Link } from 'react-router-dom'

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

                if(user.statusCode !== 'use') {
                    setError('이메일 인증을 해주세요.')
                } else {
                    login(token)
                    onSetUserInfo(user)
                    history.push('/')
                }                
            })
            .catch(e => {
                console.log('error: ', e)
                setError('아이디 또는 비밀번호가 틀립니다.')
            })
        })
    }

    return (
        <div className='authTemplateBlock'>
            <div className='whiteBox'>
                <div className='logo-area'>
                    <Link to='/'>STATU</Link>
                </div>
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
                </form>
                <div className='authFooter'>
                    <Link to='/signup'>회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Login