import { createAction } from 'typesafe-actions'
import { MainSchedule } from './types'

// 액션 type
export const GET_MAINSCHEDULE = 'mainSchedule/GET_MAINSCHEDULE'
export const POST_MAINSCHEDULE = 'mainSchedule/POST_MAINSCHEDULE'
export const PUT_MAINSCHEDULE = 'mainSchedule/PUT_MAINSCHEDULE'
export const DELETE_MAINSCHEDULE = 'mainSchedule/DELETE_MAINSCHEDULE'

// 액션 생성 함수
export const getMainSchedule = createAction(GET_MAINSCHEDULE)<MainSchedule[]>()  // all
export const postMainSchedule = createAction(POST_MAINSCHEDULE)<MainSchedule>()  // schedule
export const putMainSchedule = createAction(PUT_MAINSCHEDULE)<MainSchedule>()  // schedule
export const deleteMainSchedule = createAction(DELETE_MAINSCHEDULE)<number>()  // id
