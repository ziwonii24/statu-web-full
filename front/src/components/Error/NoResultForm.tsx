import React, { FunctionComponent } from 'react'

import './styles/Error.scss'
import { Link } from 'react-router-dom'

const NoResultForm: FunctionComponent = () => {
    return (
        <div className='errorBox'>
            <h3><span role="img" aria-label="error">📢 검색 결과가 없습니다. 📢</span></h3>
            <div className='homeFooter'>
                <Link to='/'>홈으로</Link>
            </div>
        </div>
    )
}

export default NoResultForm