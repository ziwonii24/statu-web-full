import React, { FunctionComponent, useState, ChangeEvent, MouseEvent, useEffect, useMemo } from 'react'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import { UserInput } from './interfaces/UserInfo.interface'
import useUser from '../../hooks/useUser'

import { login } from './authentication'

import { history } from '../../configureStore'
import { Link } from 'react-router-dom'

import './styles/Auth.scss'

dotenv.config({ path: path.join(__dirname, '.env') })

const PasswordForm: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const [ email, setEmail ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ passwordAgain, setPasswordAgain ] = useState<string>('')

    const [ emailCheckErr, setEmailCheckErr ] = useState<boolean>(false)
    const [ emailCheckMsg, setEmailCheckMsg ] = useState<string>('')
    const [ nameCheckErr, setNameCheckErr ] = useState<boolean>(false)
    const [ nameCheckMsg, setNameCheckMsg ] = useState<string>('')
    const [ passCheckErr, setPassCheckErr ] = useState<boolean>(false)
    const [ passCheckMsg, setPassCheckMsg ] = useState<string>('')
    const [ submitMsg, setSubmitMsg ] = useState<string>('')

    const user: UserInput = {
        'email': email,
        'name': name,
        'password': password,
    }

    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handlePasswordAgainInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordAgain(e.target.value)
        if(password !== e.target.value){
            setPassCheckMsg('비밀번호가 일치하지 않습니다.')
            setPassCheckErr(false)
        } else {
            setPassCheckMsg('')
            setPassCheckErr(true)
        }
    }

    const signupSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        console.log('email : ', emailCheckErr, emailCheckMsg)
        console.log('name : ', nameCheckErr, nameCheckMsg)
        console.log('pass : ', passCheckErr, passCheckMsg)

        if(!emailCheckErr || !nameCheckErr || !passCheckErr) {
            setSubmitMsg('입력란을 모두 채워주세요.')
            return
        }

        fetch(`${SERVER_IP}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {
            console.log('[signup] res: ', res)
            
            res.json().then(response => {
                console.log('[signup] response: ', response)
                
                history.push('/login')
            })
            .catch(e => {
                console.log(e)
                console.log('[signup] signup fail')
                // setSignupError(true)
                // setSignupMsg('회원가입 실패')
            })
        })
    }
  
    console.log('*signup form rendering...')

    return (
        <div>
            <h4 className='formTitle'>비밀번호변경</h4>
            <form>      
                <div>
                    <input className='inputAuth' type='password' placeholder='현재 비밀번호' value={password} onChange={handlePasswordInputChange}/>
                </div>              
                <div>
                    <input className='inputAuth' type='password' placeholder='변경할 비밀번호' value={password} onChange={handlePasswordInputChange}/>
                </div>
                <div>
                    <input className='inputAuth' type='password' placeholder='변경할 비밀번호 확인' value={passwordAgain} onChange={handlePasswordAgainInputChange}/>
                </div>

                <div className='checkMsg'>{passCheckMsg}</div>

                <div className='errorMsg'>{submitMsg}</div>

                <div>
                    <button className='btnSubmit' type='submit' onClick={signupSubmitHandler}>등록</button>
                </div>
            </form>
        </div>
    )
}

export default PasswordForm