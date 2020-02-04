import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const NavBar: FunctionComponent = () => {

    return (
        <div>
            <Link to='/user/signup'>Signup</Link>
            <Link to='/user/login'>Login</Link>
        </div>
    )
}

export default NavBar