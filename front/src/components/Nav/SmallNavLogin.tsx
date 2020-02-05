import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import '../Nav/style/Nav.scss'

import Navbar from 'react-bootstrap/Navbar';
import pengsu from '../../pengsu.png'

const SmallNavBarLogin: FunctionComponent = () => {
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
          <div className="img"><img src={pengsu} alt="펭수" style={{ maxHeight: "100%" }} /></div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SmallNavBarLogin