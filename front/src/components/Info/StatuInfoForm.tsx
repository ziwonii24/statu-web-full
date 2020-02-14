import React, { FunctionComponent } from 'react'
import { getToken } from '../User/authentication'
import LoginForm from '../User/LoginForm'

import './styles/StatuInfo.scss'

const StatuInfoForm: FunctionComponent = () => {

    const token = getToken()

    return (
        <div className='statuInfoTemplate main-color'>
            <div className='projectInfoBox'>
                <h1>STATU</h1>
                <h5>Study Together</h5>
            </div>
            <div className='loginBox'>
                { !token && <LoginForm /> }
            </div>
        </div>
    )
}

export default StatuInfoForm