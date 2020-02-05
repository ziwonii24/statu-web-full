import { MainSchedulesState, MainScheduleActions } from './types'
import { createReducer } from 'typesafe-actions'
import { GET_MAINSCHEDULE, POST_MAINSCHEDULE, PUT_MAINSCHEDULE, DELETE_MAINSCHEDULE, 
  MAKE_REPRESENT_SECHEDULE, MAKE_PUBLIC_SECHEDULE } from './actions'

const initilaMainSchedules = [
  {
    id: 0,
    userId: 0,
    title: '',
    startDate: '',
    endDate: '',
    recommend: 0,
    view: 0,
    pb: false,
    progress: 0,
    tags: [''],
    represent: true,
    category1: [''],  // large<number>
    category2: ['']  // small<number>
  },
]

const initialDaySchedulesState: MainSchedulesState = initilaMainSchedules

const mainSchedule = createReducer<MainSchedulesState, MainScheduleActions>(initialDaySchedulesState, {
  [GET_MAINSCHEDULE]: (state, { payload: mainSchedules }) => (state = mainSchedules),
  // [GET_ONE_MAINSCHEDULE]: (state, { payload: id }) => state.filter(schedule => schedule.id === id),
  [POST_MAINSCHEDULE]: (state, { payload: mainSchedule }) => 
    state.concat(mainSchedule),
  [PUT_MAINSCHEDULE]: (state, { payload: mainSchedule }) => state.map(schedule => schedule.id === mainSchedule.id ? mainSchedule : schedule),
  [DELETE_MAINSCHEDULE]: (state, { payload: id }) => state.filter(schedule => schedule.id !== id),
  [MAKE_REPRESENT_SECHEDULE]: (state, { payload: id }) => state.map(schedule => 
    schedule.id === id ? {...schedule, represent: true} : {...schedule, represent: false}),
  [MAKE_PUBLIC_SECHEDULE]: (state, { payload: id }) => state.map(schedule => schedule.id === id ? {...schedule, pb: !schedule.pb} : schedule),
})

export default mainSchedule