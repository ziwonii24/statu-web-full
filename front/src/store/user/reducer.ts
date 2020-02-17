import { UserState, UserAction } from './types'
import { createReducer } from 'typesafe-actions'
import { SET_USERINFO, SET_TARGETUSERINFO_SUCCESS, CLEAR_TARGETUSERINFO } from './actions'

const initialUserState: UserState = {
  userInfo: null,
  targetUserInfo: []
}

const user = createReducer<UserState, UserAction>(initialUserState, {
  [SET_USERINFO]: (state, action) => ({userInfo: action.payload, targetUserInfo: state.targetUserInfo}),
  [SET_TARGETUSERINFO_SUCCESS]: (state, action) => ({userInfo: state.userInfo, targetUserInfo: state.targetUserInfo.concat(action.payload)}),
  [CLEAR_TARGETUSERINFO]: (state) => ({userInfo: state.userInfo, targetUserInfo: []})
})

export default user