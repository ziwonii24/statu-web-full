import { ActionType } from 'typesafe-actions'
import { setUserInfo, setTargetUserInfo, clearTargetUserInfo } from './actions'
import { UserInfo } from '../../components/User/interfaces/UserInfo.interface'

const userActions = { setUserInfo, setTargetUserInfo, clearTargetUserInfo }

export type UserAction = ActionType<typeof userActions>

export type UserState = {
  userInfo: UserInfo | null
  targetUserInfo: UserInfo[]
}