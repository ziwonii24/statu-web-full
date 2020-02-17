import React, { FunctionComponent } from 'react'
import WeeklyStudyLog from './WeeklyStudyLog'
import useSchedule from '../../hooks/useSchedule'
import dayjs from 'dayjs'
import localeDe from "dayjs/locale/ko"

const StudyLog: FunctionComponent = () => {
  const { getMyDaySchedules } = useSchedule()
  const today: dayjs.Dayjs = dayjs().locale(localeDe)
  const dayOfWeek = today.day()
  const startDate = today.add(-dayOfWeek, 'day').add(-52, 'week')
  const logArray = Array(7 * 52 + dayOfWeek + 1).fill(null).map(() => Array(0, 0))

  getMyDaySchedules.map(schedule => schedule.goal && 
    (logArray[dayjs(schedule.date).diff(startDate, 'day')][0] += schedule.achieve,
    logArray[dayjs(schedule.date).diff(startDate, 'day')][1] += schedule.goal))
  console.log(dayOfWeek, startDate, logArray)

  const studyLog = []
  for (let i = 0; i < getMyDaySchedules.length; i += 7) {
    // studyLog.push(<WeeklyStudyLog weekLogs={getMyDaySchedules.slice(0 + i, 7 + i)} />)
  }
  
  return (
    <>
    </>
  )
}

export default StudyLog