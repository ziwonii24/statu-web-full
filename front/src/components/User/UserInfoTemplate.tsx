import React, { FunctionComponent, useState, MouseEvent } from 'react'

import ProfileForm from './ProfileForm'
import CategoryForm from './CategoryForm'
import NicknameForm from './NicknameForm'

import './styles/Auth.scss'

const UserInfoTemplate: FunctionComponent = () => {

    const [ page, setPage ] = useState<number>(1)
    
    const clickCategoryHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setPage(1)
    }

    const clickProfileHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setPage(2)
    }

    const clickNameHandler = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setPage(3)
    }
  
    return (
        <div className='authTemplateBlock'>
            <div className='whiteBox'>
                <div className='infoHeader'>
                    <a href='' onClick={clickCategoryHandler}>카테고리설정</a> |&nbsp;
                    <a href='' onClick={clickProfileHandler}>프로필설정</a> |&nbsp;
                    <a href='' onClick={clickNameHandler}>닉네임설정</a>
                </div>
                { page == 1 ? 
                    <CategoryForm />
                : page == 2 ?
                    <ProfileForm />
                :
                    <NicknameForm />
                }
            </div>
        </div>
    )
}

export default UserInfoTemplate