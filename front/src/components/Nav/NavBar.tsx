import React, { FunctionComponent } from 'react'
import useUser from '../../hooks/useUser'
import useWindowSize from '../../hooks/useWindowSize'
import LargeNavBar from './LargeNav'
import SmallNavBar from './SmallNav'
import LargeNavBarLogin from './LargeNavLogin'
import SmallNavBarLogin from './SmallNavLogin'
import '../Nav/style/Nav.scss'

const NavBar: FunctionComponent = () => {
    const { getUserInfo } = useUser()
    const { width } = useWindowSize()
    const loggedIn = getUserInfo ? true : false
    // const row = width <= 800 ? true : false

    // widthSize: 'XL' >= 1200 > 'LG' >= 992 > 'MD' >= 768 > 'SM' >= 576 > 'XS'
    const choose = loggedIn === true ? (width <= 768 ? "smallLogin" : "largeLogin") : (width <= 768 ? "small" : "large")

    // console.log(choose)

    const selectedNavBar = {
        "small" : <SmallNavBar />,
        "large" : <LargeNavBar />,
        "smallLogin" : <SmallNavBarLogin />,
        "largeLogin" : <LargeNavBarLogin />
    }
    const finalNavbar = selectedNavBar[choose]

    return (
        <>
            {finalNavbar}
        </>
    )
}

export default NavBar
