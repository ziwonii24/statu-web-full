import React, { FunctionComponent } from 'react'
import { SubSchedule } from '../../store/subSchedule'
import { DaySchedule } from '../../store/daySchedule'

import './style/Study.scss'

interface Interface {
  tags: string[]
  goal: number
  achieve: number
  subSchedules: SubSchedule[]
  daySchedules: DaySchedule[]
}

const StudyInfo: FunctionComponent<Interface> = (props: Interface) => {
    return (
      <>
        
      </>
    )
}

export default StudyInfo
