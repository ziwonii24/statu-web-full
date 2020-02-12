import React, { FunctionComponent } from 'react'
import useCategoryData from '../hooks/useCategoryData'
import { CategoryData } from '../components/User/interfaces/UserInfo.interface'
import UserInfoTemplate from '../components/User/UserInfoTemplate'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })

const UpdateUserInfoPage: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER

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
        if(!onGetCategoryList) {
            getCategorys()
        } 
    }

    initCategory()

    return (
        <UserInfoTemplate />
    )
}

export default UpdateUserInfoPage