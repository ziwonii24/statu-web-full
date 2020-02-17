import React, { FunctionComponent } from 'react'
import Study from '../components/Study'
import Board from '../components/Board'
import { getToken } from '../components/User/authentication'
import { Redirect } from 'react-router'

const MainPage: FunctionComponent = () => {
  const token = getToken()
  return token ? 
    <>
      <Study />
      <Board />
    </>
    :
    <Redirect to='/info' />
}

export default MainPage