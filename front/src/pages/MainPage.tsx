import React, { FunctionComponent } from 'react'
import Study from '../components/Study'
import Board from '../components/Board'
import useSchedule from '../hooks/useSchedule'
import { getToken } from '../components/User/authentication'
import { Redirect } from 'react-router'

const MainPage: FunctionComponent = () => {
  const { getMainSchedules, getSubSchedules, getDaySchedules } = useSchedule()
  const token = getToken()

  return token ? 
    <>
      <Study
        getMainSchedules={getMainSchedules}
        getSubSchedules={getSubSchedules}
        getDaySchedules={getDaySchedules}
      />
      <Board 
        getMainSchedules={getMainSchedules}
        getSubSchedules={getSubSchedules}
        getDaySchedules={getDaySchedules}
      />
    </>
    :
    <Redirect to='/info' />
}

export default MainPage