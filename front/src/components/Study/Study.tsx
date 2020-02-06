import React, { FunctionComponent } from 'react'
import StudyInfo from './StudyInfo'
import { useMainSchedule, useSubSchedule, useDaySchedule } from '../../hooks/useSchedule'
import dayjs from 'dayjs'
import './style/Study.scss'

const Study: FunctionComponent = () => {
  const { mainSchedule } = useMainSchedule()
  const { subSchedule } = useSubSchedule()
  const { daySchedule } = useDaySchedule()

  const today = dayjs().format('YYYY-MM-DD')
  const yesterday = dayjs().add(-1, 'day').format('YYYY-MM-DD')

  const myRepresentMainSchedule = mainSchedule.filter(schedule => schedule.represent === true)
  const mySubSchedule = myRepresentMainSchedule.length ? 
    subSchedule.filter(schedule => schedule.calendarId === myRepresentMainSchedule[0].id) 
    : []
  
  return (
    <>
      <div className="study">
        ~공부 현황~
          <br />
        <div className="studybox">
          어제 한 공부
            {/* <StudyInfo

          /> */}
        </div>
        <div className="studybox">
          오늘 할 공부
            {/* <StudyInfo /> */}
        </div>
      </div>

      <div className="grass">잔디 심을 부분</div>
    </>
  )
}

export default Study
