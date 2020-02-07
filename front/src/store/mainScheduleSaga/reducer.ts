import { MainSchedulesState, MainScheduleActions } from './types'
import { GET_MAINSCHEDULE_SUCCESS } from './actions'
import { createReducer } from 'typesafe-actions'

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


// Handle success reducer
export const getMainScheduleReducer = createReducer<MainSchedulesState, MainScheduleActions>(initialDaySchedulesState, {
  [GET_MAINSCHEDULE_SUCCESS]: (state, { payload: mainSchedules }) => (state = mainSchedules),
  
})
export default getMainScheduleReducer