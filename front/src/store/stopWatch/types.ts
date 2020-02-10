import { ActionType } from 'typesafe-actions'
import { toggleIsRunning, setTimeElapsed, setTargetDaySchedule } from './actions'

const stopWatchActions = {
  toggleIsRunning, setTimeElapsed, setTargetDaySchedule
}

export type StopWatchActions = ActionType<typeof stopWatchActions>

export type StopWatchState = {
  isRunning: boolean
  timeElapsed: number
  targetDaySchedule: number
}