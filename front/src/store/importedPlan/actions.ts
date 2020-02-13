import { createAsyncAction } from 'typesafe-actions'
import { ImportedSchedule, ImportedSchedulesState } from './types'

// 액션 type
export const GET_IMPORTED_SCHEDULE_REQUEST = 'importedPlan/GET_IMPORTED_SCHEDULE_REQUEST'
export const GET_IMPORTED_SCHEDULE_SUCCESS = 'importedPlan/GET_IMPORTED_SCHEDULE_SUCCESS'
export const GET_IMPORTED_SCHEDULE_FAILURE = 'importedPlan/GET_IMPORTED_SCHEDULE_FAILURE'

export const POST_IMPORTED_SCHEDULE_REQUEST = 'importedPlan/POST_IMPORTED_SCHEDULE_REQUEST'
export const POST_IMPORTED_SCHEDULE_SUCCESS = 'importedPlan/POST_IMPORTED_SCHEDULE_SUCCESS'
export const POST_IMPORTED_SCHEDULE_FAILURE = 'importedPlan/POST_IMPORTED_SCHEDULE_FAILURE'

export const DELETE_IMPORTED_SCHEDULE_REQUEST = 'importedPlan/DELETE_IMPORTED_SCHEDULE_REQUEST'
export const DELETE_IMPORTED_SCHEDULE_SUCCESS = 'importedPlan/DELETE_IMPORTED_SCHEDULE_SUCCESS'
export const DELETE_IMPORTED_SCHEDULE_FAILURE = 'importedPlan/DELETE_IMPORTED_SCHEDULE_FAILURE'

// 액션 생성 함수
export const getImportedSchedule = createAsyncAction(
  GET_IMPORTED_SCHEDULE_REQUEST,
  GET_IMPORTED_SCHEDULE_SUCCESS,
  GET_IMPORTED_SCHEDULE_FAILURE
)<number, ImportedSchedulesState, Error>()

export const postImportedSchedule = createAsyncAction(
  POST_IMPORTED_SCHEDULE_REQUEST,
  POST_IMPORTED_SCHEDULE_SUCCESS,
  POST_IMPORTED_SCHEDULE_FAILURE
)<ImportedSchedule, ImportedSchedule, Error>()

export const deleteImportedSchedule = createAsyncAction(
  DELETE_IMPORTED_SCHEDULE_REQUEST,
  DELETE_IMPORTED_SCHEDULE_SUCCESS,
  DELETE_IMPORTED_SCHEDULE_FAILURE
)<number, number, Error>()