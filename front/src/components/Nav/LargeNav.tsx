import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import { history } from '../../configureStore';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

import '../Nav/style/Nav.scss'

import search from '../../img/search.png'

const LargeNavBar: FunctionComponent = () => {

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
    <div className="navBar">
      <Navbar className="navBar">
        <Navbar.Brand href="/">STATU</Navbar.Brand>
        <Nav className="mr-auto">
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
            <div className="searchImg">
              <img src={search} alt="search" style={{ maxWidth: "100%" }}/>
            </div>
          </button>
        </Nav>
        <Form inline>
          <div className="menu"><a onClick={loginClickHandler}>로그인</a></div>
          <div className="menu"><a onClick={signupClickHandler}>회원가입</a></div>
        </Form>
      </Navbar>
    </div>
  )
}

export default LargeNavBar