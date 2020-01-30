import { ModalState, ModalAction } from './types'
import { createReducer } from 'typesafe-actions'
import { OPEN_MODAL, CLOSE_MODAL } from './actions'

const initialModalState: ModalState = {
  modalState: false,
  subScheduleIdColor: [[0, '']]
}

const modal = createReducer<ModalState, ModalAction>(initialModalState, {
  [OPEN_MODAL]: (state, action) => ({modalState: true, subScheduleIdColor: action.payload}),
  [CLOSE_MODAL]: () => ({modalState: false, subScheduleIdColor: [[0, '']]})
})

export default modal