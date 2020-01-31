import { ActionType } from 'typesafe-actions'
import { openModal, closeModal, 
  postDayScheduleOnModal, putDayScheduleOnModal, deleteDayScheduleOnModal, 
  postSubScheduleOnModal, putSubScheduleOnModal, deleteSubScheduleOnModal } from './actions'
import { SubSchedule } from '../subSchedule'
import { DaySchedule } from '../daySchedule'

const modalActions = {
  openModal, closeModal,
  postDayScheduleOnModal, putDayScheduleOnModal, deleteDayScheduleOnModal,
  postSubScheduleOnModal, putSubScheduleOnModal, deleteSubScheduleOnModal
}

export type ModalAction = ActionType<typeof modalActions>
export type Schedules = [SubSchedule[], DaySchedule[]]

export type ModalState = {
  modalState: boolean
  schedules: Schedules
}