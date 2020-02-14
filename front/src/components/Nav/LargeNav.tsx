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
    <Navbar className="navBar">
      <div className="TitleSearchInput">
        <Navbar.Brand href="/" className="TitleAndMenu">STATU</Navbar.Brand>
        <div className="inputAndFakeDiv">
          <input
            className="search"
            type="text"
            value={query}
            placeholder="시간표 찾기"
            onChange={handleSearchInput}
          />
          <div className="fakeClickDiv" onClick={searchClickHandler} />
        </div>
      </div>

      <Form inline className="TitleAndMenu">
        <div className="menu"><a onClick={loginClickHandler}>로그인</a></div>
        <div className="menu"><a onClick={signupClickHandler}>회원가입</a></div>
      </Form>
    </Navbar >
  )
}

export default LargeNavBar