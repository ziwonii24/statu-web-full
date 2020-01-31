import { createAction } from 'typesafe-actions'
import { SubSchedule } from './types'

// 액션 type
export const GET_SUBSCHEDULE = 'subSchedule/GET_SUBSCHEDULE'
export const POST_SUBSCHEDULE = 'subSchedule/POST_SUBSCHEDULE'
export const PUT_SUBSCHEDULE = 'subSchedule/PUT_SUBSCHEDULE'
export const DELETE_SUBSCHEDULE = 'subSchedule/DELETE_SUBSCHEDULE'

// 액션 생성 함수
export const getSubSchedule = createAction(GET_SUBSCHEDULE)<SubSchedule[]>()  // all
export const postSubSchedule = createAction(POST_SUBSCHEDULE)<SubSchedule>()  // schedule
export const putSubSchedule = createAction(PUT_SUBSCHEDULE)<SubSchedule>()  // schedule
export const deleteSubSchedule = createAction(DELETE_SUBSCHEDULE)<number>()  // id
