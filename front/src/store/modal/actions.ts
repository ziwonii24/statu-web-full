import { createAction } from 'typesafe-actions'

// 액션 type
export const OPEN_MODAL = 'modal/OPEN_MODAL'
export const CLOSE_MODAL = 'modal/CLOSE_MODAL'

// 액션 생성 함수
export const openModal = createAction(OPEN_MODAL)<boolean>()
export const closeModal = createAction(CLOSE_MODAL)<boolean>()
