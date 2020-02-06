import React, { FunctionComponent } from 'react'
import useUser from '../../hooks/useUser'
import { Link } from 'react-router-dom'

import '../Nav/style/Nav.scss'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import pengsu from '../../pengsu.png'


const LargeNavBarLogin: FunctionComponent = () => {
  const { onSetUserInfo } = useUser()

  const handleLogout = () => {
    onSetUserInfo(null)
  }

  return (
    <div className="navBar">

      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">STATU</Navbar.Brand>
        <Nav className="mr-auto">
          <input className="search" type="text" placeholder="시간표 찾기"/>
          <button>🔍</button>
          {/* <Button variant="outline-primary">Search</Button> */}
        </Nav>
        <Form inline>
          <div className="menu"><Link to='/myplan'>내 공부</Link></div>
          <div className="menu"><Link to='/'>가져온 공부</Link></div>
          <div className="menu"><Link to='/'>커뮤니티</Link></div>
          <div 
            className="menu"
            onClick={handleLogout}
          >
            <Link to='/'>로그아웃</Link>
          </div>
          <div className="img"><img src={pengsu} alt="펭수" style={{ maxHeight: "100%" }} /></div>
        </Form>
      </Navbar>
    </div>
  )
}

export default LargeNavBarLogin