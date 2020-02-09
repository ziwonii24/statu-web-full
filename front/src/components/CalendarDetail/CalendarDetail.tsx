import React, { FunctionComponent, useMemo } from 'react'
// import useSchedule from '../../hooks/useSchedule'
// import usePlanPage from '../../hooks/usePlanPage'
// import { SubSchedule, DaySchedule } from '../../store/schedule'

// interface Interface {
//   calendarId: number
//   calendarUserId: number
//   defaultTitle: string
//   subSchedule: SubSchedule[]
//   daySchedule: DaySchedule[]
//   represent: boolean
//   tags: string[]
// }

// const CalendarDetail:FunctionComponent<Interface> = (props: Interface) => {
//   console.log('CalendarDetail')
//   const {
//     calendarId,
//     calendarUserId,
//     defaultTitle,
//     subSchedule,
//     daySchedule,
//     represent: boolean
//     tags: string[]
//   } = props 
//   const { onSetUserId } = usePlanPage()

//   const seletedSchedule = mainSchedule.filter(schedule => schedule.id === parseInt(planId))[0]

//   const schedule = useMemo(() =>
//     <Calendar
//       calendarId={seletedSchedule.id}
//       calendarUserId={seletedSchedule.userId}
//       defaultTitle={seletedSchedule.title}
//       subSchedule={subSchedule.filter(subItem => seletedSchedule.id === subItem.calendarId)}
//       daySchedule={daySchedule.filter(dayItem => seletedSchedule.id === dayItem.calendarId)}
//       represent={true}
//       tags={seletedSchedule.tags}
//     />, [planId])

//   return schedule
// }

// export default CalendarDetail