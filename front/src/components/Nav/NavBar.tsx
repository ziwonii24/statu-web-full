import React, { FunctionComponent, Component } from 'react'
import '../Nav/style/Nav.scss'
import LargeNavBar from './LargeNav'
import SmallNavBar from './SmallNav'
import LargeNavBarLogin from './LargeNavLogin'
import SmallNavBarLogin from './SmallNavLogin'
import { useWindowSize } from "@reach/window-size";
import { Link } from 'react-router-dom'
import { history } from '../../configureStore'
import useUser from '../../hooks/useUser'

const NavBar: FunctionComponent = () => {
    const { width, height } = useWindowSize();
    // console.log(width)
    const row = width <= 800 ? true : false    

    const { onGetUserInfo, onSetUserInfo } = useUser()
    const loggedIn = !onGetUserInfo ? false : true

    const handleLogout = () => {
        console.log('logout clicked')
        history.push('/')
        localStorage.removeItem('token')
        onSetUserInfo(null)
    }

    const choose = loggedIn === true ? (width <= 800 ? "smallLogin" : "largeLogin") : (width <= 800 ? "small" : "large")
    // console.log(choose)

    const selectedNavBar = {
        "small" : <SmallNavBar />,
        "large" : <LargeNavBar />,
        "smallLogin" : <SmallNavBarLogin onLogout={handleLogout} />,
        "largeLogin" : <LargeNavBarLogin onLogout={handleLogout} />
    }
    const finalNavbar = selectedNavBar[choose]

    console.log('nav bar rendering...')
    console.log('loggedIn = ', loggedIn)

    return (
        <>
            {finalNavbar}
        </>
    )
}

export default NavBar
