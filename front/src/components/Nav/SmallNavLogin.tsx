import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

import path from 'path'
import dotenv from 'dotenv'

import usePlanPage from '../../hooks/usePlanPage'
import { UserInfo } from '../User/interfaces/UserInfo.interface';
import { history } from '../../configureStore';

import Navbar from 'react-bootstrap/Navbar';

import '../Nav/style/Nav.scss'
import search from '../../img/search.png'

dotenv.config({ path: path.join(__dirname, '.env') })

interface Props {
  onLogout: () => void
  user: UserInfo
}

const SmallNavBarLogin: FunctionComponent<Props> = (props: Props) => {

  const SERVER_IMG_IP = process.env.REACT_APP_TEST_SERVER_IMG

  const { onLogout, user } = props

  const [query, setQuery] = useState<string>('')
  const { onSetUserId } = usePlanPage()
  const imgUrl = `${SERVER_IMG_IP}/${user.img}`

  const handleSearchInput = ((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  })

  const searchClickHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    history.push(`/search/${query}`)
  }

  const myPlanClickHandler = (e: MouseEvent<HTMLElement>) => {
    onSetUserId(user.id)
    history.push(`/plan/${user.name}`)
  }

  const importedPlanClickHandler = (e: MouseEvent<HTMLElement>) => {
    history.push('/importedplan')
  }

  const profileClickHandler = (e: MouseEvent<HTMLElement>) => {
    history.push('/userinfo')
  }

  return (
    <Navbar className="navBar" expand="lg">
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
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="toggle TitleAndMenu">
          <br />
          <div className="menu"><a onClick={myPlanClickHandler} >내 공부</a></div>
          <br />
          <div className="menu"><a onClick={importedPlanClickHandler}>가져온 공부</a></div>
          <br />
          <div className="menu"><a onClick={onLogout} >로그아웃</a></div>
          <br />
          <div><img className='userImg' src={imgUrl} onClick={profileClickHandler} /></div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SmallNavBarLogin