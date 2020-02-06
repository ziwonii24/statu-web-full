import { PlanPageState, PlanPageAction } from './types'
import { createReducer } from 'typesafe-actions'
import { SET_USERID } from './actions'

const initialUserState: PlanPageState = {
  userId: 0,
}

const planPage = createReducer<PlanPageState, PlanPageAction>(initialUserState, {
  [SET_USERID]: (state, {payload: number}) => ({userId: number}),
})

export default planPage