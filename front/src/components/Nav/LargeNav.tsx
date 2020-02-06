import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import '../Nav/style/Nav.scss'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import pengsu from '../../pengsu.png'

const LargeNavBar: FunctionComponent = () => {
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
          <div className="menu"><Link to='/signup'>Signup</Link></div>
          <div className="menu"><Link to='/login'>login</Link></div>
          <div className="menu"><Link to='/'>커뮤니티</Link></div>
          <div className="img"><img src={pengsu} alt="펭수" style={{ maxHeight: "100%" }} /></div>
        </Form>
      </Navbar>
    </div>
  )
}

export default LargeNavBar