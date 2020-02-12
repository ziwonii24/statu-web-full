import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import '../Nav/style/Nav.scss'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import pengsu from '../../img/pengsu.png'

const LargeNavBar: FunctionComponent = () => {
  return (
    <div className="navBar">

      <Navbar className="navBar" bg="light" variant="light">
        <Navbar.Brand href="/">STATU</Navbar.Brand>
        <Nav className="mr-auto">
          <input className="search" type="text" placeholder="시간표 찾기"/>
          <button>🔍</button>
        </Nav>
        <Form inline>
          <div className="menu"><Link to='/signup'>회원가입</Link></div>
          <div className="menu"><Link to='/login'>로그인</Link></div>
        </Form>
      </Navbar>
    </div>
  )
}

export default LargeNavBar