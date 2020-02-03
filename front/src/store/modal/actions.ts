import { createAction } from 'typesafe-actions'
import { SubSchedule } from '../subSchedule'
import { DaySchedule } from '../daySchedule'

// 액션 type
export const OPEN_MODAL = 'modal/OPEN_MODAL'
export const CLOSE_MODAL = 'modal/CLOSE_MODAL'
export const POST_DAYSCHEDULE_ON_MODAL = 'modal/POST_DAYSCHEDULE_ON_MODAL'
export const PUT_DAYSCHEDULE_ON_MODAL = 'modal/PUT_DAYSCHEDULE_ON_MODAL'
export const DELETE_DAYSCHEDULE_ON_MODAL = 'modal/DELETE_DAYSCHEDULE_ON_MODAL'
export const POST_SUBSCHEDULE_ON_MODAL = 'modal/POST_SUBSCHEDULE_ON_MODAL'
export const PUT_SUBSCHEDULE_ON_MODAL = 'modal/PUT_SUBSCHEDULE_ON_MODAL'
export const DELETE_SUBSCHEDULE_ON_MODAL = 'modal/DELETE_SUBSCHEDULE_ON_MODAL'

// 액션 생성 함수
export const openModal = createAction(OPEN_MODAL)<[SubSchedule[], DaySchedule[]]>()
export const closeModal = createAction(CLOSE_MODAL)()
export const postDayScheduleOnModal = createAction(POST_DAYSCHEDULE_ON_MODAL)<DaySchedule>()
export const putDayScheduleOnModal = createAction(PUT_DAYSCHEDULE_ON_MODAL)<DaySchedule>()
export const deleteDayScheduleOnModal = createAction(DELETE_DAYSCHEDULE_ON_MODAL)<number>()
export const postSubScheduleOnModal = createAction(POST_SUBSCHEDULE_ON_MODAL)<SubSchedule>()
export const putSubScheduleOnModal = createAction(PUT_SUBSCHEDULE_ON_MODAL)<SubSchedule>()
export const deleteSubScheduleOnModal = createAction(DELETE_SUBSCHEDULE_ON_MODAL)<number>()
