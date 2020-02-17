import { ActionType } from 'typesafe-actions'
import { setTargetUser } from './actions'

const planPageActions = { setTargetUser }

export type PlanPageAction = ActionType<typeof planPageActions>

export type UserInfo = {    
  id: number
  email: string
  name: string
  img?: string
  category1: string[]
  category2: string[],
  statusCode: string,
}

export type PlanPageState = {
  targetUser: UserInfo
}