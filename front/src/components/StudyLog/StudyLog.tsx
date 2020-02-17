import React, { FunctionComponent, useMemo } from 'react'
import WeeklyStudyLog from './WeeklyStudyLog'
import useSchedule from '../../hooks/useSchedule'
import dayjs from 'dayjs'
import localeDe from "dayjs/locale/ko"

import './styles/StudyLog.scss'

const StudyLog: FunctionComponent = () => {
  const { getMyDaySchedules } = useSchedule()
  const today: dayjs.Dayjs = dayjs().locale(localeDe)
  const dayOfWeek = today.day()
  const startDate = today.add(-dayOfWeek, 'day').add(-52, 'week')
  const logArray = Array(7 * 52 + dayOfWeek + 1).fill(null).map(() => Array(0, 0))

  getMyDaySchedules.map(schedule => schedule.goal && 
    (logArray[dayjs(schedule.date).diff(startDate, 'day')][0] += schedule.achieve,
    logArray[dayjs(schedule.date).diff(startDate, 'day')][1] += schedule.goal))
  
  const studyLog = []
  for (let i = 0; i < logArray.length; i += 7) {
    studyLog.push(<WeeklyStudyLog key={i} weekLogs={logArray.slice(0 + i, 7 + i)} />)
  }
  console.log(studyLog)

  return (
    <div className='studyLog'>{studyLog}</div>
  )
}

export default StudyLog