import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { history } from '../../configureStore'
import useUser from '../../hooks/useUser'

const NavBar: FunctionComponent = () => {

    const { onSetUserInfo } = useUser()

    const handleLogout = () => {
        history.push('/')
        localStorage.removeItem('token')
        onSetUserInfo(null)
    }

    console.log('nav bar rendering...')

    return (
        <div>
            <Link to='/'>메인화면</Link>
            <Link to='/signup'>회원가입</Link>
            <Link to='/login'>로그인</Link>
            <a onClick={handleLogout}>로그아웃</a>
        </div>
    )
}

export default NavBar