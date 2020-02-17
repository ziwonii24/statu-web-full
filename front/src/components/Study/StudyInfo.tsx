import React, { FunctionComponent, useMemo } from 'react'
import DayStudyInfo from './DayStudyInfo'
import { SubSchedule, DaySchedule } from '../../store/schedule'
import './style/Study.scss'

interface Interface {
  colors: string[]
  subSchedules: SubSchedule[]
  daySchedules: DaySchedule[]
  studyType: string
}

const StudyInfo: FunctionComponent<Interface> = (props: Interface) => {
  const { colors, subSchedules, daySchedules, studyType } = props

  const subScheduleTag = useMemo(() => 
    subSchedules.length ? subSchedules.map(schedule => {
      return (
        <div
          key={schedule.id}
          className={`subScheduleTag`}
          style={{ backgroundColor: schedule.color }}
        >
          {schedule.subTitle.slice(0, 4)}
        </div>
      )
    }) : ''
  , [subSchedules])

  const dayScheduleDiv = useMemo(() => 
    daySchedules && daySchedules.map((schedule, idx) => {
      return (
        <DayStudyInfo 
          key={schedule.id}
          color={colors[idx]}
          daySchedule={schedule}
          studyType={studyType}
        />
      )
    })
  , [daySchedules])

  return (
    <>
      <div className='subScheduleTagBox'>
        {subScheduleTag}
      </div>      
      {dayScheduleDiv}
    </>
  )
}

export default StudyInfo
