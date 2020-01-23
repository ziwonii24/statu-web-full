import { ModalState, ModalAction } from './types'
import { createReducer } from 'typesafe-actions'
import { OPEN_MODAL, CLOSE_MODAL } from './actions'

const initialModalState: ModalState = {
  modalState: false
}

const modal = createReducer<ModalState, ModalAction>(initialModalState, {
  [OPEN_MODAL]: (state, action) => ({modalState: state.modalState = action.payload}),
  [CLOSE_MODAL]: (state, action) => ({modalState: state.modalState = action.payload})
})

export default modal