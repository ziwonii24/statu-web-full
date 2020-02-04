import { createAction } from 'typesafe-actions'
import { SubSchedule } from '../subSchedule'
import { DaySchedule } from '../daySchedule'

// 액션 type
export const OPEN_MODAL = 'modal/OPEN_MODAL'
export const CLOSE_MODAL = 'modal/CLOSE_MODAL'
export const OPEN_DAY_MODAL = 'modal/OPEN_DAY_MODAL'
export const OPEN_SUB_MODAL = 'modal/OPEN_SUB_MODAL'
export const PUT_DAYSCHEDULE_ON_MODAL = 'modal/PUT_DAYSCHEDULE_ON_MODAL'
export const PUT_SUBSCHEDULE_ON_MODAL = 'modal/PUT_SUBSCHEDULE_ON_MODAL'

// 액션 생성 함수
export const openModal = createAction(OPEN_MODAL)<[SubSchedule[], SubSchedule, DaySchedule]>()
export const closeModal = createAction(CLOSE_MODAL)()
export const openDayModal = createAction(OPEN_DAY_MODAL)<[SubSchedule[], DaySchedule]>()
export const openSubModal = createAction(OPEN_SUB_MODAL)<SubSchedule>()
export const putDayScheduleOnModal = createAction(PUT_DAYSCHEDULE_ON_MODAL)<DaySchedule>()
export const putSubScheduleOnModal = createAction(PUT_SUBSCHEDULE_ON_MODAL)<SubSchedule>()