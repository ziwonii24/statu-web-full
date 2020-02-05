import { ActionType } from 'typesafe-actions'
import { getMainSchedule, postMainSchedule, putMainSchedule, deleteMainSchedule, makeRepresentSchedule, makePublicSchedule } from './actions'

const mainScheduleActions = {getMainSchedule, postMainSchedule, putMainSchedule, deleteMainSchedule, makeRepresentSchedule, makePublicSchedule}

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
  category1?: Array<string>  // large
  category2?: Array<string>  // small
}

export type MainSchedulesState = MainSchedule[]
