import { ActionType } from 'typesafe-actions'
import { getMainSchedule, postMainSchedule, putMainSchedule, deleteMainSchedule } from './actions'

const mainScheduleActions = {getMainSchedule, postMainSchedule, putMainSchedule, deleteMainSchedule}

export type MainScheduleActions = ActionType<typeof mainScheduleActions>

export interface MainSchedule {
  id: number
  userId: number
  title: string
  startDate?: string  // date인데 test 할 때는 string
  endDate?: string
  recommend?: number
  view?: number
  pb: boolean
  progress?: number // float type 으로 받아야하는데 float 라이브러리를 쓸 것인지 고민
  tags: Array<string>
  represent: boolean
  category1?: Array<number>  // large
  category2?: Array<number>  // small
}

export type MainSchedulesState = MainSchedule[]
