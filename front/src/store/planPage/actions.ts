import { createAction } from 'typesafe-actions'
import { UserInfo } from './types'

export const SET_TARGETUSER = 'planPage/SET_TARGETUSER'

export const setTargetUser = createAction(SET_TARGETUSER)<UserInfo>()