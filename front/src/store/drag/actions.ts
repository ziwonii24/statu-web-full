import { createAction } from 'typesafe-actions'

export const SET_STARTDATE = 'calendar/SET_STARTDATE'
export const SET_TEMPDATE = 'calendar/SET_TEMPDATE'
export const SET_ENDDATE = 'calendar/SET_ENDDATE'

export const setStartDate = createAction(SET_STARTDATE)<string>()
export const setTempDate = createAction(SET_TEMPDATE)<string>()
export const setEndDate = createAction(SET_ENDDATE)<string>()