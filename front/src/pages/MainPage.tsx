import React, { FunctionComponent } from 'react'
import Study from '../components/Study'
import Board from '../components/Board'
import useSchedule from '../hooks/useSchedule'
import useWindowSize from '../hooks/useWindowSize'
import { getToken } from '../components/User/authentication'
import { Redirect } from 'react-router'

const MainPage: FunctionComponent = () => {
  const { getMainSchedules, getSubSchedules, getDaySchedules } = useSchedule()
  const { width } = useWindowSize()
  const bodyMargin = width >= 992 ? 'lg-body-content' : (width >= 768 ? 'md-body-content' : 'sm-body-content')
  const token = getToken()

  return token ?
    <div className={bodyMargin}>
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
    </div>
    :
    <Redirect to='/info' />
}

export default MainPage