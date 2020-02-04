import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import { UserDto } from './interfaces/UserInfo.interface'

import { Link } from 'react-router-dom'
import { history } from '../../configureStore'
import { login } from './authentication'

dotenv.config({ path: path.join(__dirname, '.env') })

const Login: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER  
    const [ email, setEmail ] = useState<string>('')  
    const [ password, setPassword ] = useState<string>('')
    const user: UserDto = {
        'email': email,
        'password': password,
    }

    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const loginSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        // try {
        //     await axios.post(`${SERVER_IP}/user/signin`, user)
        //             .then(res => alert(`result = ${JSON.stringify(res)}`))
        // }
        // catch(e) {
        //     alert(e)
        // }

        e.preventDefault()
        // alert('로그인 버튼 눌렸다' + JSON.stringify(user))

        fetch(`${SERVER_IP}/user/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {
            console.log(res)

            res.json().then(response => {
                console.log(response)
                console.log(response.data.jwt)
                login(response.data.jwt)
            })
            
            // TODO: res 기반으로 validation check

            history.push('/')
            
            // history.push('/user/login')

            /* if (res.status === 200 || res.status === 202){
                console.log("signup success")
            } else {
                console.log("signup fail")
            } */
        })
    }

    return (
        <div>
            <h1>로그인</h1>
            <form>
                <div>
                    <input type='text' placeholder='이메일' value={email} onChange={handleEmailInputChange}/>
                </div>
                <div>
                    <input type='password' placeholder='비밀번호' value={password} onChange={handlePasswordInputChange}/>
                </div>
                <div>
                    <button type='submit' onClick={loginSubmitHandler}>로그인</button>
                </div>
            </form>
        </div>
    )
}

export default Login