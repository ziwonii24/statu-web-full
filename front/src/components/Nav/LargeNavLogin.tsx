import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import '../Nav/style/Nav.scss'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import pengsu from '../../pengsu.png'
import { UserInfo } from '../User/interfaces/UserInfo.interface';
import { history } from '../../configureStore';

interface Props {
  onLogout : () => void
  user: UserInfo
}

const LargeNavBarLogin: FunctionComponent<Props> = (props: Props) => {

  const { onLogout, user } = props

  const handleMyPlan = () => {
    history.push(`/plan/${user.name}`)
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
          <div className="menu"><a onClick={handleMyPlan} >내 공부</a></div>
          <div className="menu"><Link to='/importedplan'>가져온 공부</Link></div>
          <div className="menu"><Link to='/community'>커뮤니티</Link></div>
          <div className="menu"><a onClick={onLogout} >로그아웃</a></div>
          <div className="img"><img src={pengsu} alt="펭수" style={{ maxHeight: "100%" }} /></div>
        </Form>
      </Navbar>
    </div>
  )
}

export default LargeNavBarLogin