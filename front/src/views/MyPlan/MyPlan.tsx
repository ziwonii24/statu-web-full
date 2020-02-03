import React, { FunctionComponent, useEffect } from 'react'
import Calendar from '../../components/Calendar'
import { mainScheduleData, subScheduleData, dayScheduleData } from '../../components/Calendar/dataSet/dataSet'
import { useMainSchedule, useSubSchedule, useDaySchedule } from '../../hooks/useSchedule'


const MyPlan: FunctionComponent = () => {
  const { onGetMainSchedule, onPostMainSchedule, onPutMainSchedule, onDeleteMainSchedule, mainSchedule } = useMainSchedule()
  const { onGetSubSchedule, subSchedule } = useSubSchedule()
  const { onGetDaySchedule, daySchedule } = useDaySchedule()

  onGetMainSchedule(mainScheduleData)
  onGetSubSchedule(subScheduleData)
  onGetDaySchedule(dayScheduleData)

  // useEffect(() => {
  //   onGetMainSchedule(mainScheduleData)
  //   console.log('mainScheduleData')
  // }, [mainScheduleData])

  // useEffect(() => {
  //   onGetSubSchedule(subScheduleData)
  //   console.log('subScheduleData')
  // }, [subScheduleData])

  // useEffect(() => {
  //   onGetDaySchedule(dayScheduleData)
  //   console.log('dayScheduleData')
  // }, [dayScheduleData])

  // console.log(mainSchedule)

  const initialMainSchedule = {
    id: 0,
    userId: 1,
    title: 'default',
    startDate: '',
    endDate: '',
    recommend: 0,
    view: 0,
    public: false,
    progress: 15.7,
    tag: [],
    represent: false,
    category1: [],
    category2: []
  }

  const representCalendar = mainSchedule.filter(schedule => schedule.represent === true)

  return (
    <>
      <div>
      {representCalendar.map(schedule => {
          if (schedule.represent === true) {
            return (
              <Calendar
                key={schedule.id}
                calendarId={schedule.id}
                initialTitle={schedule.title}
                subSchedule={subSchedule.filter(subItem => schedule.id === subItem.calenderId)}
                daySchedule={daySchedule.filter(dayItem => schedule.id === dayItem.calendarId)}
                represent={true}
              />
            )
          }
        })}
      </div>
      <div>
        {mainSchedule.map(schedule => {
          if (schedule.represent !== true) {
            return (
              <Calendar
                key={schedule.id}
                calendarId={schedule.id}
                initialTitle={schedule.title}
                subSchedule={subSchedule.filter(subItem => schedule.id === subItem.calenderId)}
                daySchedule={daySchedule.filter(dayItem => schedule.id === dayItem.calendarId)}
                represent={false}
              />
            )
          }
        })}
      </div>
    </>
  )
}

export default MyPlan