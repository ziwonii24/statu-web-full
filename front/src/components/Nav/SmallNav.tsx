import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar';
import pengsu from '../../img/pengsu.png'
import '../Nav/style/Nav.scss'

const SmallNavBar: FunctionComponent = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <div className="search">
      <Navbar.Brand href="/">STATU</Navbar.Brand>
        <input type="text" placeholder="시간표 찾기" />
        <button>🔍</button>
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="toggle">
          <br />
          <div className="menu"><Link to='/signup'>Signup</Link></div>
          <br />
          <div className="menu"><Link to='/login'>login</Link></div>
          <br />
          {/* <div className="menu"><Link to='/community'>커뮤니티</Link></div>
          <br /> */}
          <div className="userImg"><img src={pengsu} alt="펭수" style={{ maxHeight: "100%" }} /></div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SmallNavBar