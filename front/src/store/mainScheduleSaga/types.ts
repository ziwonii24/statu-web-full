import { ActionType } from 'typesafe-actions'
import { getMainSchedule } from './actions'

const getMainScheduleActions = { getMainSchedule }

export type MainScheduleActions = ActionType<typeof getMainScheduleActions>

export interface MainSchedule {
  id: number
  userId: number
  title: string
  startDate: string  // date인데 test 할 때는 string
  endDate: string
  recommend: number
  view: number
  pb: boolean
  progress?: number
  tags: Array<string>
  represent: boolean
  category1: Array<string>  // large
  category2: Array<string>  // small
}

export type MainSchedulesState = MainSchedule[]
