import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import { UserInput } from './interfaces/UserInfo.interface'

import { history } from '../../configureStore'

import './styles/Auth.scss'
import { Link } from 'react-router-dom'

dotenv.config({ path: path.join(__dirname, '.env') })

const Signup: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const [ email, setEmail ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
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

    const emailCheckHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        alert(`email 버튼 눌렸다: ${email}`)// false가 중복없는것임.
        try {
            await axios.get(`${SERVER_IP}/user/checkmail/${email}`)
                    .then(res => alert(`result = ${JSON.stringify(res.data)}`))
        }
        catch(e) {
            alert(e)
        }
    }

    const nameCheckHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        alert(`name 버튼 눌렸다: ${name}`)// false가 중복없는것임.

        // try {
        //     await axios.get(`${SERVER_IP}/user/checkname/${name}`)
        //             .then(res => alert(`result = ${JSON.stringify(res.data)}`))
        // }
        // catch(e) {
        //     alert(e)
        // }
    }

    const signupSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        /* alert('회원가입 버튼 눌렸다' + JSON.stringify(user))
        try {
            await axios.post(`${SERVER_IP}/user/signup`, user)
                    .then(res => alert(`result = ${JSON.stringify(res.data)}`))
        }
        catch(e) {
            alert(e)
        } */

        e.preventDefault()
        console.log('회원가입 버튼 눌렸다' + JSON.stringify(user))
        fetch(`${SERVER_IP}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => {
            console.log(res)
            
            // TODO: res 기반으로 validation check
            
            history.push('/user/login')

            /* if (res.status === 200 || res.status === 202){
                console.log("signup success")
            } else {
                console.log("signup fail")
            } */
        })
    }

    return (
        <div className='authTemplateBlock'>
            <div className='whiteBox'>
                <div className='logo-area'>
                    <Link to='/'>STATU</Link>
                </div>
                <h4 className='formTitle'>회원가입</h4>
                <form>
                    <div className='inputNeedCheck'>
                        <input className='inputAuth' type='text' placeholder='이메일' value={email} onChange={handleEmailInputChange}/>
                        <button className='btnCheck' onClick={emailCheckHandler}>인증</button>
                    </div>
                    <div className='inputNeedCheck'>
                        <input className='inputAuth' type='text' placeholder='닉네임' value={name} onChange={handleNameInputChange}/>
                        <button className='btnCheck' onClick={nameCheckHandler}>확인</button>
                    </div>
                    <div>
                        <input className='inputAuth' type='password' placeholder='비밀번호' value={password} onChange={handlePasswordInputChange}/><br/>
                    </div>
                    <div>
                        <input className='inputAuth' type='password' placeholder='비밀번호 확인' />
                    </div>
                    <div>
                        프로필 사진 첨부
                    </div>
                    <div>
                        카테고리 지정<br/> 
                        <div>
                            {/* {mainCategoryList}.map((name, id) => {
                                <div>
                                    name
                                    <input type='check' key={} onChange={mainCategoryCheckHandler} />
                                </div>
                            }) */}
                        </div>
                        <div>
                            {/* <SubCategoryGroup group={mainCategoryId} /> */}
                        </div>               
                    </div>
                    <div>
                        <button className='btnSubmit' type='submit' onClick={signupSubmitHandler}>회원가입</button>
                    </div>
                </form>
                <div className='authFooter'>
                    <Link to='/login'>로그인</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup