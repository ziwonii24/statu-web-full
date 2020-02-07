import { createAsyncAction } from 'typesafe-actions'
import { MainSchedule } from '../mainSchedule'

export const GET_MAINSCHEDULE_REQUEST = 'mainSchedule/GET_MAINSCHEDULE_REQUEST'
export const GET_MAINSCHEDULE_SUCCESS = 'mainSchedule/GET_MAINSCHEDULE_SUCCESS'
export const GET_MAINSCHEDULE_FAILURE = 'mainSchedule/GET_MAINSCHEDULE_FAILURE'

export const getMainSchedule = createAsyncAction(
  GET_MAINSCHEDULE_REQUEST,
  GET_MAINSCHEDULE_SUCCESS,
  GET_MAINSCHEDULE_FAILURE
)<string, MainSchedule[], Error>();