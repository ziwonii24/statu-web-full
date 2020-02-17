import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import './styles/Footer.scss'

const FooterForm: FunctionComponent = () => {
    return (
        <div className='footerBox'>
            Copyright © 2020 &nbsp;<Link to='/info'>MinsuTeam</Link>, SSAFY. All rights reserved.
        </div>
    )
}

export default FooterForm