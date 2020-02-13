import { ActionType } from 'typesafe-actions'
import { getImportedSchedule, postImportedSchedule, deleteImportedSchedule } from './actions'

const importedScheduleActions = { 
  getImportedSchedule, postImportedSchedule, deleteImportedSchedule
}

export type ImportedScheduleActions = ActionType<typeof importedScheduleActions>

export type ImportedSchedule = {
  calendarId: number,
  id: number,
  userId: number
}
export type ImportedSchedulesState = ImportedSchedule[]