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
    console.log(width)
    const loggedIn = true // true or false
    const row = width <= 800 ? true : false

    const choose = loggedIn === true ? (width <= 800 ? "smallLogin" : "largeLogin") : (width <= 800 ? "small" : "large")

    console.log(choose)

    const selectedNavBar = {
        "small" : <SmallNavBar />,
        "large" : <LargeNavBar />,
        "smallLogin" : <SmallNavBarLogin />,
        "largeLogin" : <LargeNavBarLogin />
    }
    const finalNavbar = selectedNavBar[choose]

    const { onSetUserInfo } = useUser()

    const handleLogout = () => {
        history.push('/')
        localStorage.removeItem('token')
        onSetUserInfo(null)
    }

    console.log('nav bar rendering...')

    return (
        <>
            {finalNavbar}
        </>
    )
}

export default NavBar
