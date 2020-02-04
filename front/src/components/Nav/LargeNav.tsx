import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import '../Nav/style/Nav.scss'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

const LargeNavBar: FunctionComponent = () => {
  return (
    <div className="content">

      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">STATU</Navbar.Brand>
        <Nav className="mr-auto">
          <input className="search" type="text" placeholder="시간표 찾기"/>
          <button>🔍</button>
          {/* <Button variant="outline-primary">Search</Button> */}
        </Nav>
        <Form inline>
          <div className="menu"><Link to='/user/signup'>Signup</Link></div>
          <div className="menu"><Link to='/user/login'>login</Link></div>
          <div className="menu"><Link to='/user/signup'>커뮤니티</Link></div>
          <div className="menu"><Link to='/user/signup'>회원이미지</Link></div>
        </Form>
      </Navbar>
    </div>
  )
}

export default LargeNavBar