import React, { FunctionComponent, useMemo } from 'react'

import { Dayjs } from 'dayjs'
import './styles/StudyLog.scss'

interface InterFace {
  dailyLog: number[]
  startDate: Dayjs
}

const DailyStudyLog: FunctionComponent<InterFace> = (props: InterFace) => {
  const { dailyLog, startDate } = props
  const [achieve, goal] = dailyLog
  const progress = (achieve / goal) * 100
  // console.log(startDate, achieve, goal)

  return <div
    className='dailyStudyLog third-color'
  style={{ opacity: `${progress >= 100 ? 100 : (progress >= 60 ? 70 : (progress >= 30 ? 40 : 12))}%` }}
  />
}

export default DailyStudyLog