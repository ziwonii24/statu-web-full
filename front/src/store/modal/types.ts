import { ActionType } from 'typesafe-actions'
import { openModal, closeModal, openDayModal, openSubModal, putDayScheduleOnModal, putSubScheduleOnModal } from './actions'
import { MainSchedule, SubSchedule, DaySchedule } from '../schedule'

const modalActions = {
  openModal, closeModal, openDayModal, openSubModal, putDayScheduleOnModal, putSubScheduleOnModal
}

export type ModalAction = ActionType<typeof modalActions>
export type Schedules = [MainSchedule, SubSchedule[], SubSchedule, DaySchedule]

export type ModalState = {
  modalState: boolean
  schedules: Schedules
}