import React, { FunctionComponent, useMemo } from 'react'
import WeeklyStudyLog from './WeeklyStudyLog'
import useSchedule from '../../hooks/useSchedule'
import dayjs from 'dayjs'

import './styles/StudyLog.scss'

const StudyLog: FunctionComponent = () => {
  const { getMyDaySchedules } = useSchedule()
  const today: dayjs.Dayjs = dayjs()
  const dayOfWeek = today.day()
  const startDate = today.add(-dayOfWeek, 'day').add(-78, 'week')
  const logArray = Array(7 * 78 + dayOfWeek + 1).fill(null).map(() => Array(0, 0))

  getMyDaySchedules.map(schedule => schedule.goal &&
    (logArray[dayjs(schedule.date).diff(startDate, 'day')][0] += schedule.achieve,
      logArray[dayjs(schedule.date).diff(startDate, 'day')][1] += schedule.goal))

  const studyLog = []
  for (let i = 0; i < logArray.length; i += 7) {
    studyLog.push(<WeeklyStudyLog key={i} startDate={startDate.add(i, 'day')} weekLogs={logArray.slice(0 + i, 7 + i)} />)
  }

  const dayLabel = []
  dayLabel.push(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => {
    if (idx % 2 !== 0) return <div key={idx} className='day-label'>{day}</div>
    else return <div key={idx} className='day-label' />
  }))

  return (
    <div className='studyLog'>
      <div className='week-label'>{dayLabel}</div>
      <div className='yearlyStudyLog'>{studyLog}</div>
    </div>
  )
}

export default StudyLog