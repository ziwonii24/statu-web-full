import React, { FunctionComponent, useMemo } from 'react'
import Calendar from '../components/Calendar'
import { RouteComponentProps } from 'react-router-dom'
import { history } from '../configureStore';
import useSchedule from '../hooks/useSchedule'
import usePlanPage from '../hooks/usePlanPage'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

const DetailPage: FunctionComponent<RouteComponentProps<{ planId: string }>> = (props: RouteComponentProps<{ planId: string }>) => {
  console.log('DetailPage')

  const planId = props.match.params.planId
  const { mainSchedule, subSchedule, daySchedule } = useSchedule()
  const { onSetUserId } = usePlanPage()

  const seletedSchedule = mainSchedule && mainSchedule.filter(schedule => schedule.id === parseInt(planId))[0]

  const handleClick = async () => {
    try{
      const response = await axios.get(SERVER_IP + '/id/' + seletedSchedule.userId)
      const user = response.data
      onSetUserId(user.id)
      history.push(`/plan/${user.name}`)
    }
    catch (e) {
      console.log(e)
    }
  }
  const schedule = useMemo(() =>
    seletedSchedule && 
    <Calendar
      calendarId={seletedSchedule.id}
      calendarUserId={seletedSchedule.userId}
      defaultTitle={seletedSchedule.title}
      subSchedule={subSchedule.filter(subItem => seletedSchedule.id === subItem.calendarId)}
      daySchedule={daySchedule.filter(dayItem => seletedSchedule.id === dayItem.calendarId)}
      represent={true}
      tags={seletedSchedule.tags}
      onPage='MyPlan'
    />, [seletedSchedule])

  return (
    <div
      onClick={handleClick}
    >
      {schedule}
    </div>
  ) 
}

export default DetailPage