import React, { FunctionComponent, useMemo } from 'react'

import './styles/StudyLog.scss'

interface InterFace {
  dailyLog: number[]
}

const DailyStudyLog: FunctionComponent<InterFace> = (props: InterFace) => {
  const { dailyLog } = props
  const [achieve, goal] = dailyLog
  // console.log('dailyLogs', achieve, goal)
  const progress = achieve / goal

  return <div
    className='dailyStudyLog third-color'
  style={{ opacity: `${progress >= 100 ? 100 : (progress >= 60 ? 70 : (progress >= 30 ? 40 : 20))}%` }}
  />
}

export default DailyStudyLog