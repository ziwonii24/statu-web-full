import { ModalState, ModalAction } from './types'
import { createReducer } from 'typesafe-actions'
import { OPEN_MODAL, CLOSE_MODAL, OPEN_DAY_MODAL, OPEN_SUB_MODAL, PUT_DAYSCHEDULE_ON_MODAL, PUT_SUBSCHEDULE_ON_MODAL } from './actions'

const initialMainSchedule = {
  id: 0,
  userId: 0,
  title: '',
  startDate: '',
  endDate: '',
  recommend: 0,
  view: 0,
  pb: false,
  progress: 0,
  tags: [''],
  represent: true,
  category1: [''],
  category2: ['']
}

const initialSubSchedules = [
  {
    id: 0,
    calendarId: 0,
    subTitle: '',
    color: '',
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
  todo: '',
  goal: 0,
  achieve: 0
}


const initialModalState: ModalState = {
  modalState: false,
  schedules: [initialMainSchedule, initialSubSchedules, initialSubSchedule, initialDaySchedule]
}

const modal = createReducer<ModalState, ModalAction>(initialModalState, {
  [OPEN_MODAL]: (state, { payload: [mainSchedule, subSchedules, subSchedule, daySchedule] }) => ({
    modalState: true, schedules: [mainSchedule, subSchedules, subSchedule, daySchedule]
  }),
  [CLOSE_MODAL]: () => ({
    modalState: false,
    schedules: [initialMainSchedule, initialSubSchedules, initialSubSchedule, initialDaySchedule]
  }),
  [OPEN_DAY_MODAL]: (state, { payload: [mainSchedule, subSchedules, daySchedule] }) => ({
    modalState: true,
    schedules: [mainSchedule, subSchedules, initialSubSchedule, daySchedule]
  }),
  [OPEN_SUB_MODAL]: (state, { payload: [mainSchedule, subSchedule] }) => ({
    modalState: true,
    schedules: [mainSchedule, initialSubSchedules, subSchedule, initialDaySchedule]
  }),
  [PUT_DAYSCHEDULE_ON_MODAL]: (state, { payload: daySchedule }) => ({
    modalState: false, schedules: [initialMainSchedule, initialSubSchedules, initialSubSchedule, daySchedule]
  }),
  [PUT_SUBSCHEDULE_ON_MODAL]: (state, { payload: subSchedule }) => ({
    modalState: false, schedules: [initialMainSchedule, initialSubSchedules, subSchedule, initialDaySchedule]
  }),
})


export default modal