import React, { FunctionComponent } from 'react'
import useUser from '../../hooks/useUser'
import useWindowSize from '../../hooks/useWindowSize'
import LargeNavBar from './LargeNav'
import SmallNavBar from './SmallNav'
import LargeNavBarLogin from './LargeNavLogin'
import SmallNavBarLogin from './SmallNavLogin'
import { history } from '../../configureStore'
import { logout } from '../User/authentication'

const NavBar: FunctionComponent = () => {
  const { width } = useWindowSize();

  const { onGetUserInfo, onSetUserInfo } = useUser()
  const loggedIn = !onGetUserInfo ? false : true

  const handleLogout = () => {
    alert("로그아웃 되었습니다.")
    history.push('/')
    logout()
    onSetUserInfo(null)
  }

  // widthSize: 'XL' >= 1200 > 'LG' >= 992 > 'MD' >= 768 > 'SM' >= 576 > 'XS'
  const choose = loggedIn === true ? (width <= 800 ? "smallLogin" : "largeLogin") : (width <= 768 ? "small" : "large")

  const selectedNavBar = {
    "small": <SmallNavBar />,
    "large": <LargeNavBar />,
    "smallLogin": <SmallNavBarLogin onLogout={handleLogout} user={onGetUserInfo!!!} />,
    "largeLogin": <LargeNavBarLogin onLogout={handleLogout} user={onGetUserInfo!!!} />
  }
  const finalNavbar = selectedNavBar[choose]

  return (
    <>
      {finalNavbar}
    </>
  )
}

export default NavBar
