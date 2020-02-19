import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import { UserInput } from './interfaces/UserInfo.interface'

import { history } from '../../configureStore'
import { Link } from 'react-router-dom'

import './styles/Auth.scss'

dotenv.config({ path: path.join(__dirname, '.env') })

const Signup: FunctionComponent = () => {

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

    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
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

    const emailCheckHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        
        const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(email.match(regex) == null) {
            setEmailCheckMsg('이메일 형식에 맞지 않습니다.')
            setEmailCheckErr(false)
            return
        }

        try {
            await axios.get(`${SERVER_IP}/user/checkmail/${email}`)
                .then(res => {      
                    if(res.data.result == 'true') {
                        setEmailCheckMsg('이미 존재하는 이메일입니다.')
                        setEmailCheckErr(false)
                    } else {
                        setEmailCheckMsg('사용 가능한 이메일입니다. 가입 후 인증해주세요.')
                        setEmailCheckErr(true)
                    }
                })
        }
        catch(e) {
            console.log(e)
            setEmailCheckMsg('이메일을 입력해주세요.')
            setEmailCheckErr(false)
        }
    }

    const nameCheckHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        try {
            await axios.get(`${SERVER_IP}/user/checkname/${name}`)
                .then(res => {  
                    if(res.data.result == 'true') {
                        setNameCheckMsg('이미 있는 닉네임 입니다.')
                        setNameCheckErr(false)
                    } else {
                        setNameCheckMsg('사용 가능한 닉네임 입니다.')                            
                        setNameCheckErr(true)
                    }
                })
        }
        catch(e) {
            console.log(e)
            setNameCheckMsg('닉네임을 입력해주세요.')
            setNameCheckErr(false)
        }
    }

    const signupSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        if(!emailCheckErr || !nameCheckErr || !passCheckErr) {
            setSubmitMsg('입력란을 모두 채워주세요.')
            return
        }

        fetch(`${SERVER_IP}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {            
            res.json().then(response => {                
                history.push('/')
            })
            .catch(e => {
                console.log(e)
            })
        })
    }

    return (
        <div className='authTemplateBlock'>
            <div className='whiteBox'>
                <h4 className='formTitle'>회원가입</h4>
                <form>
                    <div className='inputNeedCheck'>
                        <input className='inputAuth' type='text' placeholder='이메일' value={email} onChange={handleEmailInputChange}/>
                        <button className='btnCheck' onClick={emailCheckHandler}>확인</button>
                    </div>

                    <div className='checkMsg'>{emailCheckMsg}</div>

                    <div className='inputNeedCheck'>
                        <input className='inputAuth' type='text' placeholder='닉네임' value={name} onChange={handleNameInputChange}/>
                        <button className='btnCheck' onClick={nameCheckHandler}>확인</button>
                    </div>

                    <div className='checkMsg'>{nameCheckMsg}</div>
                    
                    <div>
                        <input className='inputAuth' type='password' placeholder='비밀번호' value={password} onChange={handlePasswordInputChange}/>
                    </div>
                    <div>
                        <input className='inputAuth' type='password' placeholder='비밀번호 확인' value={passwordAgain} onChange={handlePasswordAgainInputChange}/>
                    </div>

                    <div className='checkMsg'>{passCheckMsg}</div>

                    <div className='errorMsg'>{submitMsg}</div>

                    <div>
                        <button className='btnSubmit' type='submit' onClick={signupSubmitHandler}>회원가입</button>
                    </div>
                </form>
                <div className='authFooter'>
                    <Link to='/'>로그인</Link>
                </div>
            </div>
        </div>
  )
}

export default Signup