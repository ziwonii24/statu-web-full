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
  // console.log(startDate, achieve, goal, progress)

  return <div
    className='dailyStudyLog third-color'
    style={{ backgroundColor: progress >= 95 ? "rgb(0, 58, 0)" : (progress >= 75 ? "rgb(0, 107, 0)" : (progress >= 50 ? "rgb(0, 150, 25)" : (progress >= 25 ? "rgb(111, 211, 102)" : (progress > 0 ? "rgb(175, 226, 108)" : "rgb(211, 211, 211)"))))}}
  />
}

export default DailyStudyLog