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

const Signup: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const [ email, setEmail ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ passwordAgain, setPasswordAgain ] = useState<string>('')

    const [ emailCheckErr, setEmailCheckErr ] = useState<string>('')
    const [ emailCheckMsg, setEmailCheckMsg ] = useState<string>('')
    const [ nameCheckErr, setNameCheckErr ] = useState<string>('')
    const [ nameCheckMsg, setNameCheckMsg ] = useState<string>('')
    const [ passCheckErr, setPassCheckErr ] = useState<string>('')
    const [ passCheckMsg, setPassCheckMsg ] = useState<string>('')

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
        } else {
            setPassCheckMsg('')
        }
    }

    const emailCheckHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        try {
            await axios.get(`${SERVER_IP}/user/checkmail/${email}`)
                    .then(res => {
                        // res.data.result 값을 기준으로 리렌더링 하고 싶다...
                        console.log('[axios] res = ', res)
                        console.log('[axios] res.data.result = ', res.data.result)
                        console.log(typeof(res.data.result))
                        
                        console.log('setEmailCheckErr before')                        

                        if(res.data.result == 'true') {
                            console.log('res.data.result는 true다?', res.data.result)
                            setEmailCheckMsg('이메일을 확인해주세요.')
                        } else {
                            console.log('res.data.result는 true가 아니다?', res.data.result)
                            setEmailCheckMsg('유효하지 않은 이메일 형식입니다.')
                        }

                        // setNameCheckErr(res.data.result)    // rendering
                        console.log('setEmailCheckErr after')

                        console.log('[axios] emailCheckMsg = ', emailCheckMsg)
                        console.log(typeof(emailCheckErr))
                        // setNameCheckClicked(true)
                        // return res.data.result
                    })
                    /* .then(result => {
                        console.log('[axios then] nameCheckErr: ', nameCheckErr)
                        console.log('[axios then] 넘어오는 result: ', result)
                        setNameCheckErr(result)
                    }) */
        }
        catch(e) {
            console.log(e)
            console.log('nameCheckMsg 비어있음')
            setEmailCheckMsg('이메일을 입력해주세요.')
        }
    }

    const nameCheckHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        // if(nameCheckMsg == '') {
        //     console.log('nameCheckMsg 비어있음')
        //     // setNameCheckMsg('닉네임을 입력해주세요.')
        //     return
        // }

        try {
            await axios.get(`${SERVER_IP}/user/checkname/${name}`)
                    .then(res => {
                        // res.data.result 값을 기준으로 리렌더링 하고 싶다...
                        console.log('[axios] res.data.result=', res.data.result)
                        console.log(typeof(res.data.result))
                        
                        console.log('setnamecheckerr before')
                        

                        if(res.data.result == 'true') {
                            console.log('res.data.result는 true다?', res.data.result)
                            setNameCheckMsg('이미 있는 닉네임 입니다.')
                        } else {
                            console.log('res.data.result는 true가 아니다?', res.data.result)
                            setNameCheckMsg('사용 가능한 닉네임 입니다.')
                        }

                        // setNameCheckErr(res.data.result)    // rendering
                        console.log('setnamecheckerr after')

                        console.log('[axios] nameCheckMsg = ', nameCheckMsg)
                        console.log(typeof(nameCheckErr))
                        // setNameCheckClicked(true)
                        // return res.data.result
                    })
                    /* .then(result => {
                        console.log('[axios then] nameCheckErr: ', nameCheckErr)
                        console.log('[axios then] 넘어오는 result: ', result)
                        setNameCheckErr(result)
                    }) */
        }
        catch(e) {
            console.log(e)
            console.log('nameCheckMsg 비어있음')
            setNameCheckMsg('닉네임을 입력해주세요.')
        }
    }

    const signupSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()

        // 닉네임 중복 체크 했는지 확인
        if(nameCheckMsg == '') {
            console.log('nameCheckMsg 비어있음')
            // setNameCheckMsg('닉네임을 입력해주세요.')
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
                
                if(!response.status) {
                    console.log('[signup] signup fail')
                    // setSignupError(true)
                    // setSignupMsg('회원가입 실패')
                } else {
                    history.push('/login')
                }
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
    console.log('*바꼈나? ', nameCheckMsg)

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

                    <div className='checkMsg'>{emailCheckMsg}</div>

                    <div className='inputNeedCheck'>
                        <input className='inputAuth' type='text' placeholder='닉네임' value={name} onChange={handleNameInputChange}/>
                        <button className='btnCheck' onClick={nameCheckHandler}>확인</button>
                    </div>

                    <div className='checkMsg'>{nameCheckMsg}</div>
                    {/* { nameCheckErr ? <div className='checkMsg'>중복</div> : <div className='checkMsg'>중복 아님</div> } */}
                    {/* { nameCheckClicked && (nameCheckErr ? <div className='checkMsg'>중복</div> : <div className='checkMsg'>중복 아님</div>) } */}
                    {/* <div className='checkMsg'>닉네임 중복체크 결과 자리</div> */}
                    {/* <AuthMessage nameCheckErr={nameCheckErr} /> */}
                    {/* { nameCheckMsg && (nameCheckErr ? <div>중복</div> : <div>중복 아님</div>) } */}
                    
                    <div>
                        <input className='inputAuth' type='password' placeholder='비밀번호' value={password} onChange={handlePasswordInputChange}/>
                    </div>
                    <div>
                        <input className='inputAuth' type='password' placeholder='비밀번호 확인' value={passwordAgain} onChange={handlePasswordAgainInputChange}/>
                    </div>

                    <div className='checkMsg'>{passCheckMsg}</div>
                    
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

                    <div className='errorMsg'>회원가입 결과 자리</div>

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