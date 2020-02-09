import { GetScheduleActions, GetSchedulesState } from './types'
import { createReducer } from 'typesafe-actions'
import { GET_SCHEDULE_SUCCESS, POST_MAINSCHEDULE, PUT_MAINSCHEDULE, DELETE_MAINSCHEDULE, MAKE_REPRESENT_SECHEDULE, MAKE_PUBLIC_SECHEDULE,
  POST_SUBSCHEDULE, PUT_SUBSCHEDULE, DELETE_SUBSCHEDULE, POST_DAYSCHEDULE, PUT_DAYSCHEDULE, DELETE_DAYSCHEDULE } from './actions'

const initialDayDatas = [
  {
    calendarId: 0,
    subTitleId: 0,
    id: 0,
    date: '',
    todo: '',
    goal: 0,
    achieve: 0
  }
]

const initialSubDatas = [
  {
    id: 0,
    calendarId: 0,
    subTitle: '',
    color: '',
    startDate: '',
    endDate: '',
  },
]

const initailMainDatas = [
  {
    id: 0,
    userId: 0,
    title: '',
    startDate: '',
    endDate: '',
    recommend: 0,
    view: 0,
    pb: false,
    progress: 0,
    tags: [''],
    represent: true,
    category1: [''],  // large<number>
    category2: ['']  // small<number>
  },
]

const initialSchedulesState: GetSchedulesState = {
  mainSchedules: initailMainDatas, 
  subSchedules: initialSubDatas, 
  daySchedules: initialDayDatas
}

const schedule = createReducer<GetSchedulesState, GetScheduleActions>(initialSchedulesState, {
  [GET_SCHEDULE_SUCCESS]: (state, { payload: schedules }) => schedules,
  // mainSchedule
  [POST_MAINSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: mainSchedule }) => ({
    mainSchedules: mainSchedules.concat(mainSchedule),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [PUT_MAINSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: mainSchedule }) => ({
    mainSchedules: mainSchedules.map(schedule => schedule.id === mainSchedule.id ? mainSchedule : schedule),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [DELETE_MAINSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules.filter(schedule => schedule.id !== id),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [MAKE_REPRESENT_SECHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules.map(schedule => schedule.id === id ? {...schedule, represent: true} : {...schedule, represent: false}),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [MAKE_PUBLIC_SECHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules.map(schedule => schedule.id === id ? {...schedule, pb: !schedule.pb} : schedule),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  // subSchedule
  [POST_SUBSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: subSchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules.concat(subSchedule),
    daySchedules: daySchedules
  }),
  [PUT_SUBSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: subSchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules.map(schedule => schedule.id === subSchedule.id ? subSchedule : schedule),
    daySchedules: daySchedules
  }),
  [DELETE_SUBSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules.filter(schedule => schedule.id !== id),
    daySchedules: daySchedules
  }),
  // daySchedule
  [POST_DAYSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: daySchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules,
    daySchedules: daySchedules.concat(daySchedule)
  }),
  [PUT_DAYSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: daySchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules,
    daySchedules: daySchedules.map(schedule => schedule.id === daySchedule.id ? daySchedule : schedule)
  }),
  [DELETE_DAYSCHEDULE]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules,
    daySchedules: daySchedules.filter(schedule => schedule.id !== id),
  }),
})

export default schedule