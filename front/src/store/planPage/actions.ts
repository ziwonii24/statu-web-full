import { createAction } from 'typesafe-actions'

export const SET_USERID = 'planPage/SET_USERID'

export const setUserId = createAction(SET_USERID)<number>()