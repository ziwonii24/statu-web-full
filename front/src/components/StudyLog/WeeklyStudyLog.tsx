import React, { FunctionComponent, useMemo } from 'react'
import DailyStudyLog from './DailyStudyLog'

import { Dayjs } from 'dayjs'
import './styles/StudyLog.scss'

interface InterFace {
  weekLogs: number[][]
  startDate: Dayjs
}

const WeeklyStudyLog: FunctionComponent<InterFace> = (props: InterFace) => {
  const { weekLogs, startDate } = props
  // console.log(weekLogs)
  const endDate = startDate.add(7, 'day')
  const monthLabel = (startDate.month() !== endDate.month()) ? endDate.format('MMM') : ''
  const weeklyStudyLog = useMemo(() => 
    weekLogs.map((log, idx) => <DailyStudyLog key={idx} startDate={startDate} dailyLog={log}/>)
  , [weekLogs]) 

  return (
    <div className='weeklyStudyLog'>
      <div className='month-label'>{monthLabel}</div>
      {weeklyStudyLog}
    </div>
  )
}

export default WeeklyStudyLog