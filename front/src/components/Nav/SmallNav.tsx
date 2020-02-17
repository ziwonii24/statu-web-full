import React, { FunctionComponent, useState, ChangeEvent, MouseEvent, KeyboardEvent } from 'react'
import usePlanPage from '../../hooks/usePlanPage'
import { UserInfo } from '../User/interfaces/UserInfo.interface';
import { history } from '../../configureStore';

import serach from '../../img/search.png'
import menu from '../../img/menu.png'

import '../Nav/style/Nav.scss'

const SERVER_IMG_IP = process.env.REACT_APP_TEST_SERVER_IMG

interface Props {
  onLogout: () => void
  user: UserInfo
}

const SmallNavBar: FunctionComponent<Props> = (props: Props) => {
  const { onLogout, user } = props

  const [query, setQuery] = useState<string>('')
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const { onSetTargetUser } = usePlanPage()

  const handleClickLogo = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    history.push(`/`)
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSearchClick = (e: MouseEvent<HTMLElement>) => {
    if (query === '') return
    e.preventDefault()
    history.push(`/search/${query}`)
  }

  const handleSearchEnter = (e: KeyboardEvent) => {
    if (query === '') return
    if (e.key !== 'Enter') return
    history.push(`/search/${query}`)
  }

  const handleToggle = () => {
    setShowMenu(!showMenu)
    console.log('click', showMenu)
  }

  const handleClickMyPlan = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onSetTargetUser(user)
    setShowMenu(false)
    history.push(`/plan/${user.name}`)
  }

  const handleClickImportedPlan = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setShowMenu(false)
    history.push('/star')
  }

  const handleClickProfile = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setShowMenu(false)
    history.push('/user')
  }

  const handleLogin = (e: MouseEvent<HTMLElement>) => {
    history.push('/')
  }

  const handleSignUp = (e: MouseEvent<HTMLElement>) => {
    history.push('/signup')
  }

  return (
    <div className="navBar main-color">
      <div className="viewOption">
      <div className="leftComponent">
          <a className="logo" onClick={handleClickLogo}>STATU</a>
          <div className={`scheduleSearch`}>
            <input
              className="searchInput"
              type="text"
              placeholder="시간표 찾기"
              value={query}
              onChange={handleSearchInput}
              onKeyPress={handleSearchEnter}
            />
            <div
              className={`xs-button`}
              onClick={handleSearchClick}
            >
              <img src={serach} alt="검색" style={{ width: "18px" }} />
            </div>
          </div>
        </div>

        <div
          className={`menuBtn`}
          onClick={handleToggle}
        >
          <img className={`menuImg`} src={menu} alt="menu-btn" />
        </div>
      </div>
      {showMenu ?
        (user ?
        <div className="toggle">
          <div className="sm-menu main-color"><a onClick={handleClickMyPlan} >내 공부</a></div>
          <div className="sm-menu main-color"><a onClick={handleClickImportedPlan}>가져온 공부</a></div>
          <div className="sm-menu main-color"><a onClick={onLogout} >로그아웃</a></div>
          <div className="sm-menu img-menu main-color"><img className='userImg' src={`${SERVER_IMG_IP}/${user.img}`} onClick={handleClickProfile} /></div>
        </div>
        :
        <div className="toggle">
          <div className="sm-menu main-color"><a onClick={handleLogin}>로그인</a></div>
          <div className="sm-menu main-color"><a onClick={handleSignUp}>회원가입</a></div>
        </div>
        )
        :
        ''}
    </div>
  )
}

export default SmallNavBar