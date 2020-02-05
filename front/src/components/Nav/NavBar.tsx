import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const NavBar: FunctionComponent = () => {

    return (
        <div>
            <Link to='/'>home</Link> | 
            <Link to='/signup'>Signup</Link> |
            <Link to='/login'>login</Link> |
            <Link to='/userinfo'>userinfo</Link> |
            <Link to='/plan'>plan</Link> |
            <Link to='/importedplan'>importedplan</Link> |
            <Link to='/search'>search</Link> |
            <Link to='/detail'>detail</Link>
        </div>
    )
}

export default NavBar