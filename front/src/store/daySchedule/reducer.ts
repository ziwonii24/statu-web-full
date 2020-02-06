import { DaySchedulesState, DayScheduleActions } from './types'
import { createReducer } from 'typesafe-actions'
import { GET_DAYSCHEDULE, POST_DAYSCHEDULE, PUT_DAYSCHEDULE, DELETE_DAYSCHEDULE } from './actions'

const initialData = [
  {
    calendarId: 0,
    subTitleId: 0,
    id: 0,
    date: '',
    todo: '',
    goal: 0,
    achieve: 0
  }
]

const initialDaySchedulesState: DaySchedulesState = initialData

const daySchedule = createReducer<DaySchedulesState, DayScheduleActions>(initialDaySchedulesState, {
  [GET_DAYSCHEDULE]: (state, { payload: daySchedules }) => daySchedules,
  [POST_DAYSCHEDULE]: (state, { payload: daySchedule }) => state.concat(daySchedule),
  [PUT_DAYSCHEDULE]: (state, { payload: daySchedule }) => state.map(schedule => schedule.id === daySchedule.id ? daySchedule : schedule),
  [DELETE_DAYSCHEDULE]: (state, { payload: id }) => state.filter(schedule => schedule.id !== id)
})

export default daySchedule