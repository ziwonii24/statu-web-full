import { DaySchedulesState, DayScheduleActions } from './types'
import { createReducer } from 'typesafe-actions'
import { GET_DAYSCHEDULE, POST_DAYSCHEDULE, PUT_DAYSCHEDULE, DELETE_DAYSCHEDULE } from './actions'
import { dayScheduleData } from '../../components/Calendar/dataSet/dataSet'

const testData = dayScheduleData
const initialData = [
  {
    calendarId: 1,
    subTitleId: 2,
    id: 1,
    date: '2020-01-01',
    component: 'item 1',
    goal: 270,
    achieve: 167
  }
]

const initialDaySchedulesState: DaySchedulesState = testData

const daySchedule = createReducer<DaySchedulesState, DayScheduleActions>(initialDaySchedulesState, {
  [GET_DAYSCHEDULE]: (state, { payload: daySchedules }) => daySchedules,
  [POST_DAYSCHEDULE]: (state, { payload: daySchedule }) => state.concat(daySchedule),
  [PUT_DAYSCHEDULE]: (state, { payload: daySchedule }) => state.map(schedule => schedule.id === daySchedule.id ? daySchedule : schedule),
  [DELETE_DAYSCHEDULE]: (state, { payload: id }) => state.filter(schedule => schedule.id !== id)
})

export default daySchedule