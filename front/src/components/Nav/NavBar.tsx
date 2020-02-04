import React, { FunctionComponent, Component } from 'react'
import '../Nav/style/Nav.scss'
import LargeNavBar from './LargeNav'
import SmallNavBar from './SmallNav'
import { useWindowSize } from "@reach/window-size";

const NavBar: FunctionComponent = () => {
    const { width, height } = useWindowSize();
    const large = LargeNavBar
    const small = SmallNavBar
    console.log(width)
    const choose = width <= 800 ? "small" : "large"
    const selectedNavBar = {
        "small" : <SmallNavBar />,
        "large" : <LargeNavBar />
    }
    const finalNavbar = selectedNavBar[choose]

    return (
        <>
            {finalNavbar}
        </>
    )
}

export default NavBar