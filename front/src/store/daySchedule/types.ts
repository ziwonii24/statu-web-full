import { ActionType } from 'typesafe-actions'
import { getDaySchedule, postDaySchedule, putDaySchedule, deleteDaySchedule } from './actions'

const dayScheduleActions = {getDaySchedule, postDaySchedule, putDaySchedule, deleteDaySchedule}

export type DayScheduleActions = ActionType<typeof dayScheduleActions>

export type DaySchedule = {
  calendarId: number,
  subTitleId: number,
  id: number,
  date: string,
  component: string,
  goal: number,  // 시간 분 
  achieve: number,
}

export type DaySchedulesState = DaySchedule[]
