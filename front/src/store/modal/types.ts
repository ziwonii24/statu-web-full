import { ActionType } from 'typesafe-actions'
import { openModal, closeModal, openDayModal, openSubModal, putDayScheduleOnModal, putSubScheduleOnModal } from './actions'
import { SubSchedule, DaySchedule } from '../schdule'

const modalActions = {
  openModal, closeModal, openDayModal, openSubModal, putDayScheduleOnModal, putSubScheduleOnModal
}

export type ModalAction = ActionType<typeof modalActions>
export type Schedules = [SubSchedule[], SubSchedule, DaySchedule]

export type ModalState = {
  modalState: boolean
  schedules: Schedules
}