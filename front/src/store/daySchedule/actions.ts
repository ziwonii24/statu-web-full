import { createAction } from 'typesafe-actions'
import { DaySchedule } from './types'

// 액션 type
export const GET_DAYSCHEDULE = 'daySchedule/GET_DAYSCHEDULE'
export const POST_DAYSCHEDULE = 'daySchedule/POST_DAYSCHEDULE'
export const PUT_DAYSCHEDULE = 'daySchedule/PUT_DAYSCHEDULE'
export const DELETE_DAYSCHEDULE = 'daySchedule/DELETE_DAYSCHEDULE'

// 액션 생성 함수
export const getDaySchedule = createAction(GET_DAYSCHEDULE)<DaySchedule[]>()  // all
export const postDaySchedule = createAction(POST_DAYSCHEDULE)<DaySchedule>()  // schedule
export const putDaySchedule = createAction(PUT_DAYSCHEDULE)<DaySchedule>()  // schedule
export const deleteDaySchedule = createAction(DELETE_DAYSCHEDULE)<number>()  // id
