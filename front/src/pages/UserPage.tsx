import React, { FunctionComponent } from 'react'
import useCategoryData from '../hooks/useCategoryData'
import useWindowSize from '../hooks/useWindowSize'
import { CategoryData } from '../components/User/interfaces/UserInfo.interface'
import UserInfoTemplate from '../components/User/UserInfoTemplate'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'
import { getToken } from '../components/User/authentication'
import { Redirect } from 'react-router'

dotenv.config({ path: path.join(__dirname, '.env') })

const UserPage: FunctionComponent = () => {

    const token = getToken()
    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

    const { width } = useWindowSize()
    const bodyMargin = width >= 992 ? 'lg-body-content' : (width >= 768 ? 'md-body-content' : 'sm-body-content')
    const { onGetCategoryList, onSetCategoryList } = useCategoryData()
    let categorys: CategoryData[]

    const getCategorys = async () => {
        await axios.get(`${SERVER_IP}/categorys`)
            .then(res => {
                categorys = res.data
            })
            .then(() => {
                onSetCategoryList(categorys)
            })
    }

    const initCategory = () => {
        if (!onGetCategoryList) {
            getCategorys()
        }
    }

    initCategory()

    return <div className={bodyMargin}>
        {
            token ?
            <UserInfoTemplate />
            :
            <Redirect to='/info' />
        }
    </div> 
}

export default UserPage