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

const ProfileForm: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const fileFindHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('find clicked')
    }

    const fileSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('submit clicked')
    }
  
    console.log('*profile form rendering...')

    return (
        <div>
            <h4 className='formTitle'>프로필설정</h4>
            <form>                
                <div>이미지가 보이는 곳</div>

                <div className='checkMsg'>file msg</div>

                <div>
                    <button onClick={fileFindHandler}>파일찾기</button>
                </div>

                <div className='errorMsg'>error msg</div>

                <div>
                    <button className='btnSubmit' type='submit' onClick={fileSubmitHandler}>등록</button>
                </div>
            </form>           
        </div>
    )
}

export default ProfileForm