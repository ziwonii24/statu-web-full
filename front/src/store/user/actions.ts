import { createAction } from 'typesafe-actions'
import { UserInfo } from '../../components/User/interfaces/UserInfo.interface'

export const SET_USERINFO = 'user/SET_USERINFO'

export const setUserInfo = createAction(SET_USERINFO)<UserInfo>()