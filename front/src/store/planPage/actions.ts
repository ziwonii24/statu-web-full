import { createAction } from 'typesafe-actions'
import { UserInfo } from './types'

export const SET_USERID = 'planPage/SET_USERID'

export const setTargetUser = createAction(SET_USERID)<UserInfo>()