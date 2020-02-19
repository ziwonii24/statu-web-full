import React, { FunctionComponent, useMemo } from 'react'
import Calendar from '../components/Calendar'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import { history } from '../configureStore';
import useSchedule from '../hooks/useSchedule'
import usePlanPage from '../hooks/usePlanPage'
import useWindowSize from '../hooks/useWindowSize'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

const DetailPage: FunctionComponent<RouteComponentProps<{ planId: string }>> = (props: RouteComponentProps<{ planId: string }>) => {
  console.log('DetailPage')

  console.log('[detail] ',props.match.params)
  const planId = props.match.params.planId
  const { getMainSchedules, getSubSchedules, getDaySchedules } = useSchedule()
  const { onSetTargetUser } = usePlanPage()
  const { width } = useWindowSize()
  const bodyMargin = width >= 992 ? 'lg-body-content' : (width >= 768 ? 'md-body-content' : 'sm-body-content')

  const seletedSchedule = getMainSchedules && getMainSchedules.filter(schedule => schedule.id === parseInt(planId))[0]

  const handleClick = async () => {
    try{
      const response = await axios.get(SERVER_IP + '/user/id/' + seletedSchedule.userId)
      const user = response.data
      onSetTargetUser(user)
      history.push(`/plan/${user.name}`)
    }
    catch (e) {
      console.log(e)
    }
  }
  const schedule = useMemo(() =>
    seletedSchedule && seletedSchedule.pb ? 
    <Calendar
      calendarId={seletedSchedule.id}
      importId={0}
      calendarUserId={seletedSchedule.userId}
      defaultTitle={seletedSchedule.title}
      startMonth={seletedSchedule.startDate}
      subSchedule={getSubSchedules.filter(subItem => seletedSchedule.id === subItem.calendarId)}
      daySchedule={getDaySchedules.filter(dayItem => seletedSchedule.id === dayItem.calendarId)}
      represent={true}
      tags={seletedSchedule.tags}
      onPage='DetailPage'
    />
    :
    <Redirect to="/"></Redirect>
  , [seletedSchedule])
    
  return (
    <div
      onClick={handleClick}
      className={bodyMargin}
    >
      {schedule}
    </div>
  ) 
}

export default DetailPage