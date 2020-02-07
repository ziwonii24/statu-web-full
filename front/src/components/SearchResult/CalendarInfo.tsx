import React, { FunctionComponent } from 'react'
import { MainSchedule } from '../../store/mainSchedule'
import { useMainSchedule, useSubSchedule, useDaySchedule } from '../../hooks/useSchedule'
import usePlanPage from '../../hooks/usePlanPage'
import { history } from '../../configureStore'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

interface Interface {
  mainSchedule: MainSchedule
}
const CalendarInfo: FunctionComponent<Interface> = (props: Interface) => {
  const { mainSchedule, } = props
  const { onPutMainSchedule } = useMainSchedule()
  const { subSchedule } = useSubSchedule()
  const { daySchedule } = useDaySchedule()
  const { onSetUserId } = usePlanPage()

  const handleDetailPage = async (schedule: MainSchedule) => {
    let userName
    const editedSchedule = {...schedule, view: schedule.view + 1}
    // 검색결과에서 클릭 할 때마다 view + 1
    onPutMainSchedule(editedSchedule)
    try {
      const response = await axios.put(SERVER_IP + '/calendar', editedSchedule)
      console.log(response.data)
    }
    catch (e) {
      console.log(e)
    }
    history.push(`/detail/${mainSchedule.id}`)
  }

  return (
    <div
      onClick={() => handleDetailPage(mainSchedule)}
    >
      <div>{mainSchedule.title}</div>
      <div>{mainSchedule.startDate} {mainSchedule.endDate}</div>
      <div>{mainSchedule.tags}</div>
      <div>{mainSchedule.view} {mainSchedule.recommend}</div>
    </div>
  )
}

export default CalendarInfo