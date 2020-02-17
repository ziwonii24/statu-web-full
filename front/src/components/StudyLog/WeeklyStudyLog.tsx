import React, { FunctionComponent, useMemo } from 'react'
import DailyStudyLog from './DailyStudyLog'

import './styles/StudyLog.scss'

interface InterFace {
  weekLogs: number[][]
}

const WeeklyStudyLog: FunctionComponent<InterFace> = (props: InterFace) => {
  const { weekLogs } = props
  // console.log('weekLogs', weekLogs)
  const weeklyStudyLog = useMemo(() => weekLogs.map((log, idx) => <DailyStudyLog key={idx} dailyLog={log}/>) ,[weekLogs]) 
  return (
    <div className='weeklyStudyLog'>
      {weeklyStudyLog}
    </div>
  )
}

export default WeeklyStudyLog