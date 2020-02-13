import { ImportedSchedulesState, ImportedScheduleActions } from './types'
import { createReducer } from 'typesafe-actions'
import { GET_IMPORTED_SCHEDULE_SUCCESS, DELETE_IMPORTED_SCHEDULE_SUCCESS } from './actions'

const initialImportedSchedule: ImportedSchedulesState = [
  {
    calendarId: 0,
    id: 0,
    userId: 0
  },
]

const importedSchedule = createReducer<ImportedSchedulesState, ImportedScheduleActions>(initialImportedSchedule, {
  [GET_IMPORTED_SCHEDULE_SUCCESS]: (state, { payload: schedules }) => schedules.reverse(),
  [DELETE_IMPORTED_SCHEDULE_SUCCESS]: (state, { payload: id }) => state.filter(schedule => schedule.id !== id)
})

export default importedSchedule