import React, { FunctionComponent } from 'react'
import useUser from '../../hooks/useUser'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import pengsu from '../../pengsu.png'
import '../Nav/style/Nav.scss'

const SmallNavBarLogin: FunctionComponent = () => {
  const { onSetUserInfo } = useUser()

  const handleLogout = () => {
    onSetUserInfo(null)
  }
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Navbar.Brand href="/">STATU</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="toggle">
          <input className="search" type="text" placeholder="시간표 찾기"/>
          <button>🔍</button>
          <br/>
          <div className="menu"><Link to='/myplan'>내 공부</Link></div>
          <br/>
          <div className="menu"><Link to='/'>가져온 공부</Link></div>
          <br/>
          <div className="menu"><Link to='/'>커뮤니티</Link></div>
          <br/>
          <div 
            className="menu"
            onClick={handleLogout}
          >
            <Link to='/'>로그아웃</Link>
          </div>
          <br/>
          <div className="img"><img src={pengsu} alt="펭수" style={{ maxHeight: "100%" }} /></div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SmallNavBarLogin