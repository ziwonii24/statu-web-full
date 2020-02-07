import React, { FunctionComponent, useMemo } from 'react'
import { SubSchedule } from '../../store/subSchedule'
import { DaySchedule } from '../../store/daySchedule'

import './style/Study.scss'

interface Interface {
  colors: string[]
  subSchedules: SubSchedule[]
  daySchedules: DaySchedule[]
}

const StudyInfo: FunctionComponent<Interface> = (props: Interface) => {
  const {
    colors,
    subSchedules,
    daySchedules,
  } = props

  const subScheduleDiv = useMemo(() => 
    subSchedules.length && subSchedules.map(schedule => {
      return (
        <div
          key={schedule.id}
          className={`subScheduleTag`}
          style={{ backgroundColor: schedule.color, marginRight: `${1.5}vh` }}
        >
          {schedule.subTitle}
        </div>
      )
    })
  , [subSchedules])

  const dayScheduleDiv = useMemo(() => 
    daySchedules && daySchedules.map((schedule, idx) => {
      return (
        <div
        key={schedule.id}
        className={`dayDataItem`}
      >
        <div
          className='dayListCircle'
          style={{ backgroundColor: colors[idx] }}
        />
        {schedule.todo}
        {schedule.achieve / schedule.goal}
        {schedule.achieve} - {schedule.goal}
      </div>
      )
    })
  , [daySchedules])

  return (
    <>
      {subScheduleDiv}
      {dayScheduleDiv}
    </>
  )
}

export default StudyInfo
