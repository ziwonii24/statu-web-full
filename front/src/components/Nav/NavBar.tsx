import React, { FunctionComponent, Component } from 'react'
import '../Nav/style/Nav.scss'
import LargeNavBar from './LargeNav'
import SmallNavBar from './SmallNav'
import LargeNavBarLogin from './LargeNavLogin'
import SmallNavBarLogin from './SmallNavLogin'
import { useWindowSize } from "@reach/window-size";
import { history } from '../../configureStore'
import useUser from '../../hooks/useUser'

const NavBar: FunctionComponent = () => {
    const { width, height } = useWindowSize();
    const row = width <= 800 ? true : false    

    const { onGetUserInfo, onSetUserInfo } = useUser()
    const loggedIn = !onGetUserInfo ? false : true
    console.log('onGetUserInfo: ', onGetUserInfo)
    console.log('loggedIn: ', loggedIn)

    const handleLogout = () => {
        history.push('/')
        localStorage.removeItem('token')
        onSetUserInfo(null)
    }

    const choose = loggedIn === true ? (width <= 800 ? "smallLogin" : "largeLogin") : (width <= 800 ? "small" : "large")

    const selectedNavBar = {
        "small" : <SmallNavBar />,
        "large" : <LargeNavBar />,
        "smallLogin" : <SmallNavBarLogin onLogout={handleLogout} user={onGetUserInfo!!!} />,
        "largeLogin" : <LargeNavBarLogin onLogout={handleLogout} user={onGetUserInfo!!!} />
    }
    const finalNavbar = selectedNavBar[choose]

    console.log('nav bar rendering...')

    return (
        <>
            {finalNavbar}
        </>
    )
}

export default NavBar
