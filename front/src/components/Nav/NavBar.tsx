import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const NavBar: FunctionComponent = () => {

    return (
        <div>
            <Link to='/signup'>Signup</Link>
            <Link to='/login'>Login</Link>
        </div>
    )
}

export default NavBar