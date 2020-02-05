import { ModalState, ModalAction } from './types'
import { createReducer } from 'typesafe-actions'
import { OPEN_MODAL, CLOSE_MODAL, OPEN_DAY_MODAL, OPEN_SUB_MODAL, PUT_DAYSCHEDULE_ON_MODAL, PUT_SUBSCHEDULE_ON_MODAL } from './actions'

const initialSubSchedules = [
  {
    id: 1,
    calendarId: 1,
    subTitle: '',
    color: '#AAAAAA',
    startDate: '',
    endDate: '',
  },
]

const initialSubSchedule = {
  id: 0,
  calendarId: 0,
  subTitle: '',
  color: '',
  startDate: '',
  endDate: '',
}

const initialDaySchedule = {
  calendarId: 0,
  subTitleId: 0,
  id: 0,
  date: '',
  component: '',
  goal: 0,
  achieve: 0
}


const initialModalState: ModalState = {
  modalState: false,
  schedules: [initialSubSchedules, initialSubSchedule, initialDaySchedule]
}

const modal = createReducer<ModalState, ModalAction>(initialModalState, {
  [OPEN_MODAL]: (state, { payload: [subSchedules, initialSubSchedule, initialDaySchedule] }) => ({
    modalState: true, schedules: [initialSubSchedules.concat(subSchedules), initialSubSchedule, initialDaySchedule]
  }),
  [CLOSE_MODAL]: () => ({
    modalState: false,
    schedules: [initialSubSchedules, initialSubSchedule, initialDaySchedule]
  }),
  [OPEN_DAY_MODAL]: (state, { payload: [subSchedules, daySchedule] }) => ({
    modalState: true,
    schedules: [initialSubSchedules.concat(subSchedules), initialSubSchedule, daySchedule]
  }),
  [OPEN_SUB_MODAL]: (state, { payload: subSchedule }) => ({
    modalState: true,
    schedules: [initialSubSchedules, subSchedule, initialDaySchedule]
  }),
  [PUT_DAYSCHEDULE_ON_MODAL]: (state, { payload: daySchedule }) => ({
    modalState: false, schedules: [initialSubSchedules, initialSubSchedule, daySchedule]
  }),
  [PUT_SUBSCHEDULE_ON_MODAL]: (state, { payload: subSchedule }) => ({
    modalState: false, schedules: [initialSubSchedules, subSchedule, initialDaySchedule]
  }),
})


export default modal