import { createAsyncAction } from 'typesafe-actions'
import { SchedulesState, MainSchedule, SubSchedule, DaySchedule } from './types'

// 액션 type
// get all scheudule
export const GET_SCHEDULE_REQUEST = 'getSchedule/GET_SCHEDULE_REQUEST'
export const GET_SCHEDULE_SUCCESS = 'getSchedule/GET_SCHEDULE_SUCCESS'
export const GET_SCHEDULE_FAILURE = 'getSchedule/GET_SCHEDULE_FAILURE'

// apply schedule to my plan
export const APPLY_SCHEDULE_REQUEST = 'applySchedule/APPLY_SCHEDULE_REQUEST'
export const APPLY_SCHEDULE_SUCCESS = 'applySchedule/APPLY_SCHEDULE_SUCCESS'
export const APPLY_SCHEDULE_FAILURE = 'applySchedule/APPLY_SCHEDULE_FAILURE'

// get mainSchedule Term
export const GET_MAIN_TERM_REQUEST = 'getMainTerm/GET_MAIN_TERM_REQUEST'
export const GET_MAIN_TERM_SUCCESS = 'getMainTerm/GET_MAIN_TERM_SUCCESS'
export const GET_MAIN_TERM_FAILURE = 'getMainTerm/GET_MAIN_TERM_FAILURE'

// mainSchedule
export const POST_MAINSCHEDULE_REQUEST = 'mainSchedule/POST_MAINSCHEDULE_REQUEST'
export const POST_MAINSCHEDULE_SUCCESS = 'mainSchedule/POST_MAINSCHEDULE_SUCCESS'
export const POST_MAINSCHEDULE_FAILURE = 'mainSchedule/POST_MAINSCHEDULE_FAILURE'

export const PUT_MAINSCHEDULE_REQUEST = 'mainSchedule/PUT_MAINSCHEDULE_REQUEST'
export const PUT_MAINSCHEDULE_SUCCESS = 'mainSchedule/PUT_MAINSCHEDULE_SUCCESS'
export const PUT_MAINSCHEDULE_FAILURE = 'mainSchedule/PUT_MAINSCHEDULE_FAILURE'

export const DELETE_MAINSCHEDULE_REQUEST = 'mainSchedule/DELETE_MAINSCHEDULE_REQUEST'
export const DELETE_MAINSCHEDULE_SUCCESS = 'mainSchedule/DELETE_MAINSCHEDULE_SUCCESS'
export const DELETE_MAINSCHEDULE_FAILURE = 'mainSchedule/DELETE_MAINSCHEDULE_FAILURE'

export const MAKE_REPRESENT_SECHEDULE_REQUEST = 'mainSchedule/MAKE_REPRESENT_SECHEDULE_REQUEST'
export const MAKE_REPRESENT_SECHEDULE_SUCCESS = 'mainSchedule/MAKE_REPRESENT_SECHEDULE_SUCCESS'
export const MAKE_REPRESENT_SECHEDULE_FAILURE = 'mainSchedule/MAKE_REPRESENT_SECHEDULE_FAILURE'

export const UNDO_REPRESENT_SECHEDULE_REQUEST = 'mainSchedule/UNDO_REPRESENT_SECHEDULE_REQUEST'
export const UNDO_REPRESENT_SECHEDULE_SUCCESS = 'mainSchedule/UNDO_REPRESENT_SECHEDULE_SUCCESS'
export const UNDO_REPRESENT_SECHEDULE_FAILURE = 'mainSchedule/UNDO_REPRESENT_SECHEDULE_FAILURE'

export const MAKE_PUBLIC_SECHEDULE_REQUEST = 'mainSchedule/MAKE_PUBLIC_SECHEDULE_REQUEST'
export const MAKE_PUBLIC_SECHEDULE_SUCCESS = 'mainSchedule/MAKE_PUBLIC_SECHEDULE_SUCCESS'
export const MAKE_PUBLIC_SECHEDULE_FAILURE = 'mainSchedule/MAKE_PUBLIC_SECHEDULE_FAILURE'

// subSchedule
export const GET_SUBSCHEDULE_REQUEST = 'subSchedule/GET_SUBSCHEDULE_REQUEST'
export const GET_SUBSCHEDULE_SUCCESS = 'subSchedule/GET_SUBSCHEDULE_SUCCESS'
export const GET_SUBSCHEDULE_FAILURE = 'subSchedule/GET_SUBSCHEDULE_FAILURE'

export const POST_SUBSCHEDULE_REQUEST = 'subSchedule/POST_SUBSCHEDULE_REQUEST'
export const POST_SUBSCHEDULE_SUCCESS = 'subSchedule/POST_SUBSCHEDULE_SUCCESS'
export const POST_SUBSCHEDULE_FAILURE = 'subSchedule/POST_SUBSCHEDULE_FAILURE'

export const PUT_SUBSCHEDULE_REQUEST = 'subSchedule/PUT_SUBSCHEDULE_REQUEST'
export const PUT_SUBSCHEDULE_SUCCESS = 'subSchedule/PUT_SUBSCHEDULE_SUCCESS'
export const PUT_SUBSCHEDULE_FAILURE = 'subSchedule/PUT_SUBSCHEDULE_FAILURE'

export const DELETE_SUBSCHEDULE_REQUEST = 'subSchedule/DELETE_SUBSCHEDULE_REQUEST'
export const DELETE_SUBSCHEDULE_SUCCESS = 'subSchedule/DELETE_SUBSCHEDULE_SUCCESS'
export const DELETE_SUBSCHEDULE_FAILURE = 'subSchedule/DELETE_SUBSCHEDULE_FAILURE'

export const GET_SUBSCHEDULE_ON_TARGET_REQUEST = 'subSchedule/GET_SUBSCHEDULE_ON_TARGET_REQUEST'
export const GET_SUBSCHEDULE_ON_TARGET_SUCCESS = 'subSchedule/GET_SUBSCHEDULE_ON_TARGET_SUCCESS'
export const GET_SUBSCHEDULE_ON_TARGET_FAILURE = 'subSchedule/GET_SUBSCHEDULE_ON_TARGET_FAILURE'

// daySchedule
export const POST_DAYSCHEDULE_REQUEST = 'daySchedule/POST_DAYSCHEDULE_REQUEST'
export const POST_DAYSCHEDULE_SUCCESS = 'daySchedule/POST_DAYSCHEDULE_SUCCESS'
export const POST_DAYSCHEDULE_FAILURE = 'daySchedule/POST_DAYSCHEDULE_FAILURE'

export const PUT_DAYSCHEDULE_REQUEST = 'daySchedule/PUT_DAYSCHEDULE_REQUEST'
export const PUT_DAYSCHEDULE_SUCCESS = 'daySchedule/PUT_DAYSCHEDULE_SUCCESS'
export const PUT_DAYSCHEDULE_FAILURE = 'daySchedule/PUT_DAYSCHEDULE_FAILURE'

export const DELETE_DAYSCHEDULE_REQUEST = 'daySchedule/DELETE_DAYSCHEDULE_REQUEST'
export const DELETE_DAYSCHEDULE_SUCCESS = 'daySchedule/DELETE_DAYSCHEDULE_SUCCESS'
export const DELETE_DAYSCHEDULE_FAILURE = 'daySchedule/DELETE_DAYSCHEDULE_FAILURE'


// 액션 생성 함수
// get all scheudule
export const getSchedule = createAsyncAction(
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAILURE
)<number, SchedulesState, Error>()

// apply schedule to my plan
export const applyScheduleToMyPlan = createAsyncAction(
  APPLY_SCHEDULE_REQUEST,
  APPLY_SCHEDULE_SUCCESS,
  APPLY_SCHEDULE_FAILURE
)<MainSchedule, SchedulesState, Error>()  // schedule

// get mainSchedule term
export const getMainTerm = createAsyncAction(
  GET_MAIN_TERM_REQUEST,
  GET_MAIN_TERM_SUCCESS,
  GET_MAIN_TERM_FAILURE
)<number, void, Error>()  // id

// mainSchedule
export const postMainSchedule = createAsyncAction(
  POST_MAINSCHEDULE_REQUEST,
  POST_MAINSCHEDULE_SUCCESS,
  POST_MAINSCHEDULE_FAILURE
)<MainSchedule, MainSchedule, Error>()  // schedule

export const putMainSchedule = createAsyncAction(
  PUT_MAINSCHEDULE_REQUEST,
  PUT_MAINSCHEDULE_SUCCESS,
  PUT_MAINSCHEDULE_FAILURE
)<MainSchedule, MainSchedule, Error>()  // schedule

export const deleteMainSchedule = createAsyncAction(
  DELETE_MAINSCHEDULE_REQUEST,
  DELETE_MAINSCHEDULE_SUCCESS,
  DELETE_MAINSCHEDULE_FAILURE
)<number, number, Error>()  // id

export const makeRepresentSchedule = createAsyncAction(
  MAKE_REPRESENT_SECHEDULE_REQUEST,
  MAKE_REPRESENT_SECHEDULE_SUCCESS,
  MAKE_REPRESENT_SECHEDULE_FAILURE
)<number, number, Error>()  // id

export const undoRepresentSchedule = createAsyncAction(
  UNDO_REPRESENT_SECHEDULE_REQUEST,
  UNDO_REPRESENT_SECHEDULE_SUCCESS,
  UNDO_REPRESENT_SECHEDULE_FAILURE
)<number, number, Error>()  // id

export const makePublicSchedule = createAsyncAction(
  MAKE_PUBLIC_SECHEDULE_REQUEST,
  MAKE_PUBLIC_SECHEDULE_SUCCESS,
  MAKE_PUBLIC_SECHEDULE_FAILURE
)<number, number, Error>()  // id


// subSchedule
export const getSubSchedule = createAsyncAction(
  GET_SUBSCHEDULE_REQUEST,
  GET_SUBSCHEDULE_SUCCESS,
  GET_SUBSCHEDULE_FAILURE
)<string, SubSchedule[], Error>()  // id

export const postSubSchedule = createAsyncAction(
  POST_SUBSCHEDULE_REQUEST,
  POST_SUBSCHEDULE_SUCCESS,
  POST_SUBSCHEDULE_FAILURE
)<SubSchedule, SubSchedule, Error>()  // schedule

export const putSubSchedule = createAsyncAction(
  PUT_SUBSCHEDULE_REQUEST,
  PUT_SUBSCHEDULE_SUCCESS,
  PUT_SUBSCHEDULE_FAILURE
)<SubSchedule, SubSchedule, Error>()  // schedule

export const deleteSubSchedule = createAsyncAction(
  DELETE_SUBSCHEDULE_REQUEST,
  DELETE_SUBSCHEDULE_SUCCESS,
  DELETE_SUBSCHEDULE_FAILURE
)<number, number, Error>()  // id

export const getSubScheduleOnTarget = createAsyncAction(
  GET_SUBSCHEDULE_ON_TARGET_REQUEST,
  GET_SUBSCHEDULE_ON_TARGET_SUCCESS,
  GET_SUBSCHEDULE_ON_TARGET_FAILURE
)<number, SubSchedule[], Error>()  // id

// daySchedule
export const postDaySchedule = createAsyncAction(
  POST_DAYSCHEDULE_REQUEST,
  POST_DAYSCHEDULE_SUCCESS,
  POST_DAYSCHEDULE_FAILURE
)<DaySchedule, DaySchedule, Error>()  // schedule

export const putDaySchedule = createAsyncAction(
  PUT_DAYSCHEDULE_REQUEST,
  PUT_DAYSCHEDULE_SUCCESS,
  PUT_DAYSCHEDULE_FAILURE
)<DaySchedule, DaySchedule, Error>()  // schedule

export const deleteDaySchedule = createAsyncAction(
  DELETE_DAYSCHEDULE_REQUEST,
  DELETE_DAYSCHEDULE_SUCCESS,
  DELETE_DAYSCHEDULE_FAILURE
)<number, number, Error>()  // id