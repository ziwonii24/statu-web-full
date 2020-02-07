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

const CategoryForm: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const categorySubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
    }
  
    console.log('*category form rendering...')

    return (
        <div>
            <h4 className='formTitle'>카테고리설정</h4>
            <form>
                <div>main category list</div>

                <div>sub category list</div>

                <div>뭐 선택했는지 보여줄거야?</div>

                <div className='errorMsg'>error msg</div>

                <div>
                    <button className='btnSubmit' type='submit' onClick={categorySubmitHandler}>등록</button>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm