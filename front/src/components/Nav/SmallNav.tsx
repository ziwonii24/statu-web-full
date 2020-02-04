import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import '../Nav/style/Nav.scss'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

const SmallNavBar: FunctionComponent = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Navbar.Brand href="/">STATU</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="toggle">
          <input className="search" type="text" placeholder="시간표 찾기"/>
          <button>🔍</button>
          <br/>
          <div className="menu"><Link to='/user/signup'>Signup</Link></div>
          <br/>
          <div className="menu"><Link to='/user/login'>login</Link></div>
          <br/>
          <div className="menu"><Link to='/user/signup'>커뮤니티</Link></div>
          <br/>
          <div className="menu"><Link to='/user/signup'>회원이미지</Link></div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SmallNavBar