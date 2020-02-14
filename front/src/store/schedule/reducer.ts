import { ScheduleActions, SchedulesState } from './types'
import { createReducer } from 'typesafe-actions'
import { GET_SCHEDULE_SUCCESS, MAKE_REPRESENT_SECHEDULE_SUCCESS, UNDO_REPRESENT_SECHEDULE_SUCCESS, MAKE_PUBLIC_SECHEDULE_SUCCESS, APPLY_SCHEDULE_SUCCESS,
  POST_MAINSCHEDULE_SUCCESS, PUT_MAINSCHEDULE_SUCCESS, DELETE_MAINSCHEDULE_SUCCESS, 
  GET_SUBSCHEDULE_SUCCESS, POST_SUBSCHEDULE_SUCCESS, PUT_SUBSCHEDULE_SUCCESS, DELETE_SUBSCHEDULE_SUCCESS, GET_SUBSCHEDULE_ON_TARGET_SUCCESS,
  POST_DAYSCHEDULE_SUCCESS, PUT_DAYSCHEDULE_SUCCESS, DELETE_DAYSCHEDULE_SUCCESS } from './actions'

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

const initialSchedulesState: SchedulesState = {
  mainSchedules: initailMainDatas, 
  subSchedules: initialSubDatas, 
  daySchedules: initialDayDatas
}

const schedule = createReducer<SchedulesState, ScheduleActions>(initialSchedulesState, {
  [GET_SCHEDULE_SUCCESS]: (state, { payload: schedules }) => schedules,
  
  // mainSchedule
  [POST_MAINSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: mainSchedule }) => ({
    mainSchedules: mainSchedules.concat(mainSchedule),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [PUT_MAINSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: mainSchedule }) => ({
    mainSchedules: mainSchedules.map(schedule => schedule.id === mainSchedule.id ? mainSchedule : schedule),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [DELETE_MAINSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules.filter(schedule => schedule.id !== id),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [MAKE_REPRESENT_SECHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules.map(schedule => schedule.id === id ? {...schedule, represent: true} : {...schedule, represent: false}),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [UNDO_REPRESENT_SECHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules.map(schedule => schedule.id === id ? {...schedule, represent: false} : schedule),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [MAKE_PUBLIC_SECHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules.map(schedule => schedule.id === id ? {...schedule, pb: !schedule.pb} : schedule),
    subSchedules: subSchedules,
    daySchedules: daySchedules
  }),
  [APPLY_SCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: schedules }) => ({
    mainSchedules: mainSchedules.concat(schedules.mainSchedules),
    subSchedules: subSchedules.concat(schedules.subSchedules),
    daySchedules: daySchedules.concat(schedules.daySchedules)
  }),

  // subSchedule
  [GET_SUBSCHEDULE_SUCCESS]: ({mainSchedules, daySchedules}, { payload: subSchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedule,
    daySchedules: daySchedules
  }),
  [POST_SUBSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: subSchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules.concat(subSchedule),
    daySchedules: daySchedules
  }),
  [PUT_SUBSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: subSchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules.map(schedule => schedule.id === subSchedule.id ? subSchedule : schedule),
    daySchedules: daySchedules
  }),
  [DELETE_SUBSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules.filter(schedule => schedule.id !== id),
    daySchedules: daySchedules
  }),
  // 캘린더 추가했을 때 자동으로 생성되는 소목표가 리덕스에 들어있지 않아서 발생하는 오류 해결을 위한 리듀서
  [GET_SUBSCHEDULE_ON_TARGET_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: subSchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules.concat(subSchedule),
    daySchedules: daySchedules
  }),

  // daySchedule
  [POST_DAYSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: daySchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules,
    daySchedules: daySchedules.concat(daySchedule)
  }),
  [PUT_DAYSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: daySchedule }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules,
    daySchedules: daySchedules.map(schedule => schedule.id === daySchedule.id ? daySchedule : schedule)
  }),
  [DELETE_DAYSCHEDULE_SUCCESS]: ({mainSchedules, subSchedules, daySchedules}, { payload: id }) => ({
    mainSchedules: mainSchedules,
    subSchedules: subSchedules,
    daySchedules: daySchedules.filter(schedule => schedule.id !== id),
  }),
})

export default schedule