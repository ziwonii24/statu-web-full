import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import { history } from '../../configureStore';

import Navbar from 'react-bootstrap/Navbar';

import '../Nav/style/Nav.scss'

const SmallNavBar: FunctionComponent = () => {

  const [query, setQuery] = useState<string>('')

  const handleSearchInput = ((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  })

  const searchClickHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    history.push(`/search/${query}`)
  }

  const loginClickHandler = (e: MouseEvent<HTMLElement>) => {
    history.push('/login')
  }

  const signupClickHandler = (e: MouseEvent<HTMLElement>) => {
    history.push('/signup')
  }

  return (
    <Navbar className="navBar" bg="light" variant="light" expand="lg">
      <div className="search">
      <Navbar.Brand href="/">STATU</Navbar.Brand>
        <input 
            className="search" 
            type="text"
            value={query}
            placeholder="시간표 찾기"
            onChange={handleSearchInput}
          />
          <button
            onClick={searchClickHandler}
          >
            🔍
          </button>
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="toggle">
          <br />
          <div className="menu"><a onClick={loginClickHandler}>로그인</a></div>
          <br />
          <div className="menu"><a onClick={signupClickHandler}>회원가입</a></div>
          <br />
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SmallNavBar