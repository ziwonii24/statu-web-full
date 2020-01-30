import { ActionType } from 'typesafe-actions'
import { openModal, closeModal } from './actions'

const modalActions = {openModal, closeModal}

export type ModalAction = ActionType<typeof modalActions>

export type ModalState = {modalState: boolean}