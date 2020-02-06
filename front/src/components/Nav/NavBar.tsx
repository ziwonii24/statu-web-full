import React, { FunctionComponent } from 'react'
import useUser from '../../hooks/useUser'
import useWindowSize from '../../hooks/useWindowSize'
import LargeNavBar from './LargeNav'
import SmallNavBar from './SmallNav'
import LargeNavBarLogin from './LargeNavLogin'
import SmallNavBarLogin from './SmallNavLogin'
import { history } from '../../configureStore'

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
    // widthSize: 'XL' >= 1200 > 'LG' >= 992 > 'MD' >= 768 > 'SM' >= 576 > 'XS'
    const choose = loggedIn === true ? (width <= 768 ? "smallLogin" : "largeLogin") : (width <= 768 ? "small" : "large")

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
