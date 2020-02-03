import { ActionType } from 'typesafe-actions'
import { setStartDate, setTempDate, setEndDate } from './actions'

const dragActions = { setStartDate, setTempDate, setEndDate }

export type DragAction = ActionType<typeof dragActions>

export type DragState = {
  startDate: string
  tempDate: string
  endDate: string
  mouseOverState: boolean
}