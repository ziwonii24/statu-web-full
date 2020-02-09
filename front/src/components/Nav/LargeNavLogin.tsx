import React, { FunctionComponent, useState, useCallback, ChangeEvent, MouseEvent } from 'react'
import usePlanPage from '../../hooks/usePlanPage'
import { Link } from 'react-router-dom'
import { UserInfo } from '../User/interfaces/UserInfo.interface';
import { history } from '../../configureStore';


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import pengsu from '../../pengsu.png'

import '../Nav/style/Nav.scss'

interface Props {
  onLogout : () => void
  user: UserInfo
}

const LargeNavBarLogin: FunctionComponent<Props> = (props: Props) => {

  const { onLogout, user } = props
  const { onSetUserId } = usePlanPage()
  
  const handleMyPlan = () => {
    onSetUserId(user.id)
    history.push(`/plan/${user.name}`)
  }

  const [query, setQuery] = useState<string>('')
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])
  const handleSearch = (e: MouseEvent) => {
    e.preventDefault()
    history.push(`/search/${query}`)
  }

  return (
    <div className="navBar">

      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">STATU</Navbar.Brand>
        <Nav className="mr-auto">
          <input 
            className="search" 
            type="text"
            value={query}
            placeholder="시간표 찾기"
            onChange={handleChange}
          />
          <button
            onClick={handleSearch}
          >
            🔍
          </button>
          {/* <Button variant="outline-primary">Search</Button> */}
        </Nav>
        <Form inline>
          {/* <div className="menu"><a onClick={handleMyPlan} >내 공부</a></div> */}
          <div className="menu"><a onClick={handleMyPlan} >내 공부</a></div>
          <div className="menu"><Link to='/importedplan'>가져온 공부</Link></div>
          <div className="menu"><Link to='/community'>커뮤니티</Link></div>
          <div className="menu"><Link to='/userinfo'>내정보수정</Link></div>
          <div className="menu"><a onClick={onLogout} >로그아웃</a></div>
          <div className="img"><img src={pengsu} alt="펭수" style={{ maxHeight: "100%" }} /></div>
        </Form>
      </Navbar>
    </div>
  )
}

export default LargeNavBarLogin