import React, { FunctionComponent } from 'react'

import './styles/Error.scss'
import { Link } from 'react-router-dom'

const NoTempForm: FunctionComponent = () => {
    return (
        <div className='errorBox'>
            <h3>📢 가져온 캘린더가 없습니다. 📢</h3>
            <div className='homeFooter'>
                <Link to='/'>홈으로</Link>
            </div>
        </div>
    )
}

export default NoTempForm