import { ActionType } from 'typesafe-actions'
import { getSubSchedule, postSubSchedule, putSubSchedule, deleteSubSchedule } from './actions'

const subScheduleActions = {getSubSchedule, postSubSchedule, putSubSchedule, deleteSubSchedule}

export type SubScheduleActions = ActionType<typeof subScheduleActions>

export type SubSchedule = {
  id: number
  calendarId: number
  subTitle: string
  color: string
  startDate: string  // date인데 test 할 때는 string
  endDate: string
}

export type SubSchedulesState = SubSchedule[]
