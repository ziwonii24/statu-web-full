import { ModalState, ModalAction } from './types'
import { createReducer } from 'typesafe-actions'
import { OPEN_MODAL, CLOSE_MODAL } from './actions'

const initialState: ModalState = {
  modalState: false
}

const modal = createReducer<ModalState, ModalAction>(initialState, {
  [OPEN_MODAL]: () => ({modalState: true}),
  [CLOSE_MODAL]: () => ({modalState: false})
})

export default modal