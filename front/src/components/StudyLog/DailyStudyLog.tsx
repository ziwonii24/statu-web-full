import React, { FunctionComponent } from 'react'

import { Dayjs } from 'dayjs'
import './styles/StudyLog.scss'

interface InterFace {
  dailyLog: number[]
  startDate: Dayjs
}

const DailyStudyLog: FunctionComponent<InterFace> = (props: InterFace) => {
  const { dailyLog } = props
  const [achieve, goal] = dailyLog
  const progress = (achieve / goal) * 100

  return <div
    className='dailyStudyLog third-color'
    // 초록버전
    // style={{ backgroundColor: progress >= 95 ? "rgb(17, 73, 17)" : (progress >= 75 ? "rgbrgb(6, 100, 6)" : (progress >= 50 ? "rgb(12, 129, 31)" : (progress >= 25 ? "rgb(85, 155, 78)" : (progress > 0 ? "rgba(175, 226, 108, 0.658)" : "rgb(211, 211, 211)"))))}}
    // 파란버전
    // style={{ backgroundColor: progress >= 95 ? "rgb(17, 73, 17)" : (progress >= 75 ? "rgbrgb(6, 100, 6)" : (progress >= 50 ? "rgb(12, 129, 31)" : (progress >= 25 ? "rgb(85, 155, 78)" : (progress > 0 ? "rgba(175, 226, 108, 0.658)" : "rgb(211, 211, 211)"))))}}
    // 보라버전
    style={{ backgroundColor: progress >= 95 ? "rgb(100, 7, 92)" : (progress >= 75 ? "rgba(168, 60, 148, 0.911)" : (progress >= 50 ? "rgba(192, 107, 178, 0.863)" : (progress >= 25 ? "rgb(202, 136, 191)" : (progress > 0 ? "rgba(248, 194, 248, 0.808)" : "rgb(211, 211, 211)"))))}}
    // 갈색버전
    // style={{ backgroundColor: progress >= 95 ? "rgba(102, 53, 7, 0.904)" : (progress >= 75 ? "rgba(134, 73, 17, 0.836)" : (progress >= 50 ? "rgba(138, 93, 51, 0.904)" : (progress >= 25 ? "rgba(173, 135, 96, 0.945)" : (progress > 0 ? "rgb(207, 180, 154)" : "rgb(211, 211, 211)"))))}}
    // 베이지버전
    // style={{ backgroundColor: progress >= 95 ? "rgb(171, 131, 89)" : (progress >= 75 ? "rgb(170, 144, 117)" : (progress >= 50 ? "rgb(202, 172, 140)" : (progress >= 25 ? "rgb(216, 192, 166)" : (progress > 0 ? "rgb(233, 212, 190)" : "rgb(211, 211, 211)"))))}}
  />
}

export default DailyStudyLog