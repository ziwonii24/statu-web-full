import React, { FunctionComponent } from 'react'
import { MainSchedule } from '../../store/schdule'
import useSchedule from '../../hooks/useSchedule'
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
  const { onPutMainSchedule } = useSchedule()

  const handleDetailPage = async (schedule: MainSchedule) => {
    const editedSchedule = {...schedule, view: schedule.view + 1}
    // console.log('edit', editedSchedule)
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