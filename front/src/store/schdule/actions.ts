import { createAction, createAsyncAction } from 'typesafe-actions'
import { GetSchedulesState, MainSchedule, SubSchedule, DaySchedule } from './types'

// 액션 type
// GET
export const GET_SCHEDULE_REQUEST = 'getSchedule/GET_SCHEDULE_REQUEST'
export const GET_SCHEDULE_SUCCESS = 'getSchedule/GET_SCHEDULE_SUCCESS'
export const GET_SCHEDULE_FAILURE = 'getSchedule/GET_SCHEDULE_FAILURE'

// mainSchedule
export const POST_MAINSCHEDULE = 'mainSchedule/POST_MAINSCHEDULE'
export const PUT_MAINSCHEDULE = 'mainSchedule/PUT_MAINSCHEDULE'
export const DELETE_MAINSCHEDULE = 'mainSchedule/DELETE_MAINSCHEDULE'
export const MAKE_REPRESENT_SECHEDULE = 'mainSchedule/MAKE_REPRESENT_SECHEDULE'
export const MAKE_PUBLIC_SECHEDULE = 'mainSchedule/MAKE_PUBLIC_SECHEDULE'

// subSchedule
export const POST_SUBSCHEDULE = 'subSchedule/POST_SUBSCHEDULE'
export const PUT_SUBSCHEDULE = 'subSchedule/PUT_SUBSCHEDULE'
export const DELETE_SUBSCHEDULE = 'subSchedule/DELETE_SUBSCHEDULE'

// daySchedule
export const POST_DAYSCHEDULE = 'daySchedule/POST_DAYSCHEDULE'
export const PUT_DAYSCHEDULE = 'daySchedule/PUT_DAYSCHEDULE'
export const DELETE_DAYSCHEDULE = 'daySchedule/DELETE_DAYSCHEDULE'

// 액션 생성 함수
//GET
export const getSchedule = createAsyncAction(
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILURE
)<string, GetSchedulesState, Error>()

// mainSchedule
export const postMainSchedule = createAction(POST_MAINSCHEDULE)<MainSchedule>()  // schedule
export const putMainSchedule = createAction(PUT_MAINSCHEDULE)<MainSchedule>()  // schedule
export const deleteMainSchedule = createAction(DELETE_MAINSCHEDULE)<number>()  // id
export const makeRepresentSchedule = createAction(MAKE_REPRESENT_SECHEDULE)<number>() // id
export const makePublicSchedule = createAction(MAKE_PUBLIC_SECHEDULE)<number>() // id

// subSchedule
export const postSubSchedule = createAction(POST_SUBSCHEDULE)<SubSchedule>()  // schedule
export const putSubSchedule = createAction(PUT_SUBSCHEDULE)<SubSchedule>()  // schedule
export const deleteSubSchedule = createAction(DELETE_SUBSCHEDULE)<number>()  // id

// daySchedule
export const postDaySchedule = createAction(POST_DAYSCHEDULE)<DaySchedule>()  // schedule
export const putDaySchedule = createAction(PUT_DAYSCHEDULE)<DaySchedule>()  // schedule
export const deleteDaySchedule = createAction(DELETE_DAYSCHEDULE)<number>()  // id