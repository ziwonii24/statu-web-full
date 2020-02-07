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
import ProfileForm from './ProfileForm'
import CategoryForm from './CategoryForm'
import PasswordForm from './PasswordForm'

dotenv.config({ path: path.join(__dirname, '.env') })

const UserInfoTemplate: FunctionComponent = () => {

    const [ title, setTitle ] = useState<number>(1)
    
    const clickCategoryHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('category click')
        setTitle(1)
    }

    const clickProfileHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('profile click')
        setTitle(2)
    }
    
    const clickPassHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        console.log('pass click')
        setTitle(3)
    }
  
    return (
        <div className='authTemplateBlock'>
            <div className='whiteBox'>
                <div className='infoHeader'>
                    <a href='' onClick={clickCategoryHandler}>카테고리설정</a> |&nbsp;
                    <a href='' onClick={clickProfileHandler}>프로필설정</a> |&nbsp;
                    <a href='' onClick={clickPassHandler}>비밀번호변경</a>
                </div>
                { title==1 ? 
                    <CategoryForm />
                : title==2 ? 
                    <ProfileForm />
                : 
                    <PasswordForm />
                }
            </div>
        </div>
    )
}

export default UserInfoTemplate