import { ModalState, ModalAction } from './types'
import { createReducer } from 'typesafe-actions'
import { OPEN_MODAL, CLOSE_MODAL, 
  POST_DAYSCHEDULE_ON_MODAL, PUT_DAYSCHEDULE_ON_MODAL, DELETE_DAYSCHEDULE_ON_MODAL, 
  POST_SUBSCHEDULE_ON_MODAL, PUT_SUBSCHEDULE_ON_MODAL, DELETE_SUBSCHEDULE_ON_MODAL } from './actions'

const initialSubSchedules = [
  {
    id: 1,
    calenderId: 1,
    subTitle: '',
    color: '',
    startDate: '',
    endDate: '',
  },
]

const initialDaySchedules = [
  {
    calendarId: 1,
    subTitleId: 2,
    id: 1,
    date: '2020-01-01',
    component: 'item 1',
    goal: 270,
    achieve: 167
  },
]

const initialModalState: ModalState = {
  modalState: false,
  schedules: [initialSubSchedules, initialDaySchedules]
}

const modal = createReducer<ModalState, ModalAction>(initialModalState, {
  [OPEN_MODAL]: ({modalState, schedules}, {payload: scheduleDatas}) => ({
    modalState: true, schedules: scheduleDatas
  }),
  [CLOSE_MODAL]: () => ({
    modalState: false,
    schedules: [initialSubSchedules, initialDaySchedules]
  }),
  [POST_DAYSCHEDULE_ON_MODAL]: (({modalState, schedules}, {payload: scheduleDatas}) => schedules[0].concat())

})
 

export default modal