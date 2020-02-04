import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import { UserDto } from './interfaces/UserInfo.interface'

import { history } from '../../configureStore'

dotenv.config({ path: path.join(__dirname, '.env') })

const Signup: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const [ email, setEmail ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const user: UserDto = {
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
        alert(`email 버튼 눌렸다: ${email}`)

        // try {
        //     await axios.get(`${SERVER_IP}/user/checkmail/${email}`)
        //             .then(res => console.log(`result = ${JSON.stringify(res.data)}`))
        // }
        // catch(e) {
        //     alert(e)
        // }
    }

    const nameCheckHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        alert(`name 버튼 눌렸다: ${name}`)

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
        <div>
            <h1>회원가입</h1>
            <form>
                <div>
                    <input type='text' placeholder='이메일' value={email} onChange={handleEmailInputChange}/>
                    <button onClick={emailCheckHandler}>인증</button>
                </div>
                <div>
                    <input type='text' placeholder='닉네임' value={name} onChange={handleNameInputChange}/>
                    <button onClick={nameCheckHandler}>중복체크</button>
                </div>
                <div>
                    <input type='password' placeholder='비밀번호' value={password} onChange={handlePasswordInputChange}/>
                </div>
                {/* <div>
                    <input type='password' placeholder='비밀번호 확인' />
                </div> */}
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
                    <button type='submit' onClick={signupSubmitHandler}>회원가입</button>
                </div>
            </form>
        </div>
    )
}

export default Signup