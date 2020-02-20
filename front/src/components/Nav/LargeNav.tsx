import React, { FunctionComponent, useState, ChangeEvent, MouseEvent, KeyboardEvent } from 'react'
import usePlanPage from '../../hooks/usePlanPage'
import { UserInfo } from '../User/interfaces/UserInfo.interface';
import { history } from '../../configureStore';

import serach from '../../img/search.png'

import '../Nav/style/Nav.scss'

const SERVER_IMG_IP = process.env.REACT_APP_TEST_SERVER_IMG

interface Props {
  onLogout: () => void
  user: UserInfo
}

const LargeNavBar: FunctionComponent<Props> = (props: Props) => {
  const { onLogout, user } = props

  const [query, setQuery] = useState<string>('')
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

  const handleLogin = (e: MouseEvent<HTMLElement>) => {
    history.push('/')
  }

  const handleSignUp = (e: MouseEvent<HTMLElement>) => {
    history.push('/signup')
  }

  const handleClickMyPlan = (e: MouseEvent<HTMLElement>) => {
    onSetTargetUser(user)
    history.push(`/plan/${user.name}`)
  }

  const handleClickImportedPlan = (e: MouseEvent<HTMLElement>) => {
    history.push('/star')
  }

  const handleClickProfile = (e: MouseEvent<HTMLElement>) => {
    history.push('/user')
  }

  return (
    <div className="navBar main-color">
      <div className="viewOption">
        <div className="leftComponent">
          <a className="lg-logo" onClick={handleClickLogo}></a>
          <div className={`scheduleSearch`}>
            <input
              className="lg-searchInput"
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
              <img src={serach} alt="검색" style={{ width: "18px" }}/>
            </div>
          </div>
        </div>
        

      {user ?
        <div className="menuBox">
          <div className="lg-menu"><a onClick={handleClickMyPlan} >내 공부</a></div>
          <div className="lg-menu"><a onClick={handleClickImportedPlan}>가져온 공부</a></div>
          <div className="lg-menu"><a href="http://i02a306.p.ssafy.io/" className="findStudy"><big>스</big>터디의<big>발</big>견</a></div>
          <div className="lg-menu"><a onClick={onLogout} >로그아웃</a></div>
          <div className="lg-menu"><img className='userImg' src={`${SERVER_IMG_IP}/${user.img}`} onClick={handleClickProfile} /></div>
        </div>
        :
        <div className="menuBox">
          <div className="lg-menu"><a onClick={handleLogin}>로그인</a></div>
          <div className="lg-menu"><a onClick={handleSignUp}>회원가입</a></div>
        </div>
      }
    </div>
    </div >
  )
}

export default LargeNavBar