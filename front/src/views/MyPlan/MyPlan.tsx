import React, { FunctionComponent } from 'react'
import Calendar from '../../components/Calendar'
import { useMainSchedule, useSubSchedule, useDaySchedule } from '../../hooks/useSchedule'


const MyPlan: FunctionComponent = () => {
  const { onGetMainSchedule, onPostMainSchedule, onPutMainSchedule, onDeleteMainSchedule, mainSchedule } = useMainSchedule()
  const { onGetSubSchedule, subSchedule } = useSubSchedule()
  const { onGetDaySchedule, daySchedule } = useDaySchedule()

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

  return (
    <div>
      {mainSchedule.map(schedule => (
        <Calendar
          id={schedule.id}
          title={schedule.title}
        />
      ))}
    </div>
  )
}

export default MyPlan