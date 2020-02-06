import { ActionType } from 'typesafe-actions'
import { setUserId } from './actions'

const planPageActions = { setUserId }

export type PlanPageAction = ActionType<typeof planPageActions>

export type PlanPageState = {
  userId: number
}