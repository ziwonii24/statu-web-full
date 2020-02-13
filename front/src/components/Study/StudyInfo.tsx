import React, { FunctionComponent, useState, useMemo } from 'react'
import DayStudyInfo from './DayStudyInfo'
import { SubSchedule, DaySchedule } from '../../store/schdule'
import './style/Study.scss'

interface Interface {
  colors: string[]
  subSchedules: SubSchedule[]
  daySchedules: DaySchedule[]
}

const StudyInfo: FunctionComponent<Interface> = (props: Interface) => {
  console.log('StudyInfo')
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
          style={{ backgroundColor: schedule.color, marginRight: `${1.5}vh`}}
        >
          {schedule.subTitle.slice(0, 4)}
        </div>
      )
    })
  , [subSchedules])

  const dayScheduleDiv = useMemo(() => 
    daySchedules && daySchedules.map((schedule, idx) => {
      return (
        <DayStudyInfo 
        key={schedule.id}
        color={colors[idx]}
        daySchedule={schedule}
      />
      )
    })
  , [daySchedules])

  return (
    <>
      {/* 소목표 태그들 */}
      {subScheduleDiv}
      {/* 할일 / 목표시간 */}
      {dayScheduleDiv}
    </>
  )
}

export default StudyInfo
