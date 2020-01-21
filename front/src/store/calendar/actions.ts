import { createAction } from 'typesafe-actions'

// 액션 type
export const OPEN_MODAL = 'todos/OPEN_MODAL'
export const CLOSE_MODAL = 'todos/CLOSE_MODAL'

// 액션 생성 함수
export const openModal = createAction(OPEN_MODAL)()
export const closeModal = createAction(CLOSE_MODAL)()