import { ModalState, ModalAction } from './types'
import { createReducer } from 'typesafe-actions'
import { OPEN_MODAL, CLOSE_MODAL } from './actions'

const initialState: ModalState = false

const modal = createReducer<ModalState, ModalAction>(initialState, {
  [OPEN_MODAL]: state => (state = true),
  [CLOSE_MODAL]: state => (state = false)
})

export default modal