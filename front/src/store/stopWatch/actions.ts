import { createAction } from 'typesafe-actions'

// 액션 type
export const TOGGLE_ISRUNNING = 'stopWatch/TOGGLE_ISRUNNING'
export const SET_TIME_ELAPSED = 'stopWatch/SET_TIME_ELAPSED'
export const SET_TARGET_DAYSCHEDULE = 'stopWatch/SET_TARGET_DAYSCHEDULE'

// 액션 생성 함수
export const toggleIsRunning = createAction(TOGGLE_ISRUNNING)()
export const setTimeElapsed = createAction(SET_TIME_ELAPSED)<number>()
export const setTargetDaySchedule = createAction(SET_TARGET_DAYSCHEDULE)<number>()