import { StopWatchState, StopWatchActions } from './types'
import { createReducer } from 'typesafe-actions'
import { TOGGLE_ISRUNNING, SET_TIME_ELAPSED, SET_TARGET_DAYSCHEDULE } from './actions'

const initialStopWatchState: StopWatchState = {
  isRunning: false,
  timeElapsed: 0,
  targetDaySchedule: 0
}

const stopWatch = createReducer<StopWatchState, StopWatchActions>(initialStopWatchState, {
  [TOGGLE_ISRUNNING]: ({isRunning, timeElapsed, targetDaySchedule}) => ({
    isRunning: !isRunning, timeElapsed: timeElapsed, targetDaySchedule: targetDaySchedule
  }),
  [SET_TIME_ELAPSED]: ({isRunning, timeElapsed, targetDaySchedule}, { payload: elapsedTime }) => ({
    isRunning: isRunning, timeElapsed: elapsedTime, targetDaySchedule: targetDaySchedule
  }),
  [SET_TARGET_DAYSCHEDULE]: ({isRunning, timeElapsed, targetDaySchedule}, { payload: targetDayScheduleId }) => ({
    isRunning: isRunning, timeElapsed: timeElapsed, targetDaySchedule: targetDayScheduleId
  })
})


export default stopWatch