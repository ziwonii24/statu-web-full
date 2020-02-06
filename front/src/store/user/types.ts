import { ActionType } from 'typesafe-actions'
import { setUserInfo } from './actions'
import { UserInfo } from '../../components/User/interfaces/UserInfo.interface'

const userActions = { setUserInfo }

export type UserAction = ActionType<typeof userActions>

export type UserState = {
  userInfo: UserInfo | null
}