import { createAction } from 'typesafe-actions'
import { MainSchedule } from './types'

// 액션 type
export const GET_MAINSCHEDULE = 'mainSchedule/GET_MAINSCHEDULE'
// export const GET_ONE_MAINSCHEDULE = 'mainSchedule/GET_ONE_MAINSCHEDULE'
export const POST_MAINSCHEDULE = 'mainSchedule/POST_MAINSCHEDULE'
export const PUT_MAINSCHEDULE = 'mainSchedule/PUT_MAINSCHEDULE'
export const DELETE_MAINSCHEDULE = 'mainSchedule/DELETE_MAINSCHEDULE'
export const MAKE_REPRESENT_SECHEDULE = 'mainSchedule/MAKE_REPRESENT_SECHEDULE'
export const MAKE_PUBLIC_SECHEDULE = 'mainSchedule/MAKE_PUBLIC_SECHEDULE'

// 액션 생성 함수
export const getMainSchedule = createAction(GET_MAINSCHEDULE)<MainSchedule[]>()  // all
// export const getOneMainSchedule = createAction(GET_ONE_MAINSCHEDULE)<number>()  // id
export const postMainSchedule = createAction(POST_MAINSCHEDULE)<MainSchedule>()  // schedule
export const putMainSchedule = createAction(PUT_MAINSCHEDULE)<MainSchedule>()  // schedule
export const deleteMainSchedule = createAction(DELETE_MAINSCHEDULE)<number>()  // id
export const makeRepresentSchedule = createAction(MAKE_REPRESENT_SECHEDULE)<number>() // id
export const makePublicSchedule = createAction(MAKE_PUBLIC_SECHEDULE)<number>() // id
