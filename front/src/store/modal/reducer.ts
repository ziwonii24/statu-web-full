import { ModalState, ModalAction } from './types'
import { createReducer } from 'typesafe-actions'
import { OPEN_MODAL, CLOSE_MODAL } from './actions'

const initialModalState: ModalState = {
  modalState: true
}

const modal = createReducer<ModalState, ModalAction>(initialModalState, {
  [OPEN_MODAL]: () => ({modalState: true}),
  [CLOSE_MODAL]: () => ({modalState: false})
})

export default modal