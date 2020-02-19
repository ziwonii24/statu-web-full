import React, { FunctionComponent } from 'react'

import './styles/Error.scss'
import { Link } from 'react-router-dom'

const ErrorForm: FunctionComponent = () => {
    return (
        <div className='errorBox'>
            <h3><span role="img" aria-label="error">⛔ 잘못된 접근입니다. ⛔</span></h3>
            <div className='homeFooter'>
                <Link to='/'>홈으로</Link>
            </div>
        </div>
    )
}

export default ErrorForm