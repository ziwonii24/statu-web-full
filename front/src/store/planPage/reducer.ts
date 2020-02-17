import { PlanPageState, PlanPageAction } from './types'
import { createReducer } from 'typesafe-actions'
import { SET_TARGETUSER } from './actions'

const initialUserState: PlanPageState = {
  targetUser: {    
    id: 0,
    email: 'string',
    name: 'string',
    category1: [],
    category2: [],
    statusCode: 'string',
}
}

const planPage = createReducer<PlanPageState, PlanPageAction>(initialUserState, {
  [SET_TARGETUSER]: (state, {payload: user}) => ({targetUser: user}),
})

export default planPage