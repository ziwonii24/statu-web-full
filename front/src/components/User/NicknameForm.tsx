import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import useUser from '../../hooks/useUser'

import { getToken, logout, login, decode } from './authentication'

import { history } from '../../configureStore'
import './styles/Auth.scss'

dotenv.config({ path: path.join(__dirname, '.env') })

const NicknameForm: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const { onGetUserInfo, onSetUserInfo } = useUser()

    const [ name, setName ] = useState<string>('')
    const [ nameCheckErr, setNameCheckErr ] = useState<boolean>(false)
    const [ nameCheckMsg, setNameCheckMsg ] = useState<string>('')
    const [ errormsg, setErrorMsg ] = useState<string>('')
 
    const user = onGetUserInfo

    const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
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

    const nicknameSubmitHandler = async (e: MouseEvent<HTMLElement>) => {        
        e.preventDefault()
        
        if(!nameCheckErr) {
            setErrorMsg('입력란을 모두 채워주세요.')
            return
        }
        
        const resultUser = {
            ...user,
            name: name
        }

        const token = getToken()
        if(!token) {
            history.push('/login')
            return  
        }
        
        alert('내 정보가 수정되었습니다.')
        fetch(`${SERVER_IP}/user/modify`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'token': token }, 
            body: JSON.stringify(resultUser)
        }).then(res => {          
            if(res.status !== 200 && res.status !== 202) {
                setErrorMsg('예기치 못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요!')
            } else {
                res.json().then(response => {
                    const newToken = response.data.token
                    logout()
                    login(newToken)

                    const newtokenDecoded = decode(newToken)
                    const newUser = newtokenDecoded.user
                    onSetUserInfo(newUser)
                })
            }
        })
    }

    return (
        <div>
            <h4 className='formTitle'>닉네임설정</h4>
            <form>
                <div className='inputNeedCheck'>
                    <input className='inputAuth' type='text' placeholder={user?.name} value={name} onChange={handleNameInputChange}/>
                    <button className='btnCheck' onClick={nameCheckHandler}>확인</button>
                </div>

                <div className='checkMsg'>{nameCheckMsg}</div>

                { errormsg && <div className='errorMsg'>{errormsg}</div>}

                <div>
                    <button className='btnSubmit' type='submit' onClick={nicknameSubmitHandler}>등록</button>
                </div>
            </form>
        </div>
    )
}

export default NicknameForm