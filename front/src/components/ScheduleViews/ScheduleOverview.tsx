import React, { FunctionComponent, useMemo, useEffect } from 'react'
import Calendar from '../Calendar'
import useUser from '../../hooks/useUser'
import { MainSchedule, SubSchedule, DaySchedule } from '../../store/schedule'
import { UserInfo } from '../User/interfaces/UserInfo.interface'

interface InterFace {
  mainSchedule: MainSchedule
  subSchedules: SubSchedule[]
  daySchedules: DaySchedule[]
}

const ScheduleOverview: FunctionComponent<InterFace> = (props: InterFace) => {
  console.log('ScheduleOverview')
  const { mainSchedule, subSchedules, daySchedules } = props
  const { onGetTargetUserInfo } = useUser()
  const targetUserInfo = onGetTargetUserInfo.filter(userInfo => userInfo.id === mainSchedule.userId)[0]
  console.log(onGetTargetUserInfo)

  const calendar = useMemo(() => 
    mainSchedule && <Calendar
    calendarId={mainSchedule.id}
    importId={0}
    calendarUserId={mainSchedule.userId}
    defaultTitle={mainSchedule.title}
    subSchedule={subSchedules.filter(subItem => mainSchedule.id === subItem.calendarId)}
    daySchedule={daySchedules.filter(dayItem => mainSchedule.id === dayItem.calendarId)}
    represent={true}
    tags={mainSchedule.tags}
    onPage='MyPlan'
  />
  ,[mainSchedule])

  const userInfo = useMemo(() => {
    console.log('targetUserInfo2222', targetUserInfo)
    return targetUserInfo && <div>{targetUserInfo.name}</div>
  }
    
  ,[targetUserInfo])

  return (
    <div>
      {calendar}
      {userInfo}
    </div>
  )
}

export default ScheduleOverview