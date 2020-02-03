import { MainSchedulesState, MainScheduleActions } from './types'
import { createReducer } from 'typesafe-actions'
import { GET_MAINBSCHEDULE, POST_MAINSCHEDULE, PUT_MAINSCHEDULE, DELETE_MAINSCHEDULE } from './actions'

const initialDaySchedulesState: MainSchedulesState = [
  {
    id: 1,
    userId: 1,
    title: '',
    startDate: '',
    endDate: '',
    recommend: 0,
    view: 0,
    public: false,
    progress: 0,
    tag: [],
    represent: true,
    category1: [],  // large<number>
    category2: []  // small<number>
  },
]

const mainSchedule = createReducer<MainSchedulesState, MainScheduleActions>(initialDaySchedulesState, {
  [GET_MAINBSCHEDULE]: (state, { payload: mainSchedules }) => mainSchedules,
  [POST_MAINSCHEDULE]: (state, { payload: mainSchedule }) => state.concat(mainSchedule),
  [PUT_MAINSCHEDULE]: (state, { payload: mainSchedule }) => state.map(schedule => schedule.id === mainSchedule.id ? mainSchedule : schedule),
  [DELETE_MAINSCHEDULE]: (state, { payload: id }) => state.filter(schedule => schedule.id !== id)
})

export default mainSchedule