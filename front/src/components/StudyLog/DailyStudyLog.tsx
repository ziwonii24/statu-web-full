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
    // style={{ opacity: `${progress >= 100 ? 100 : (progress >= 60 ? 80 : (progress >= 30 ? 60 : (progress >= 1 ? 40 : 12)))}%` }}
    style={{ backgroundColor: progress >= 95 ? "#003a00" : (progress >= 80 ? "#006b00" : (progress >= 65 ? "#00af1d" : (progress >= 50 ? "#3efc2d" : (progress >= 30 ? "#caf55f" : (progress >= 15 ? "#eaf9b6" : (progress > 0 ? "#f6ffde" : "#d6d6d6"))))))}}
  />
}

export default DailyStudyLog