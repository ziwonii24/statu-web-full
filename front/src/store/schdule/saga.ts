import {
  getSchedule, makeRepresentSchedule, makePublicSchedule, applyScheduleToMyPlan,
  postMainSchedule, putMainSchedule, deleteMainSchedule,
  getSubSchedule, postSubSchedule, putSubSchedule, deleteSubSchedule, getSubScheduleOnTarget,
  postDaySchedule, putDaySchedule, deleteDaySchedule
} from './actions'
import { MainSchedule, SubSchedule, DaySchedule } from './types'
import { all, call, put, fork, takeEvery } from 'redux-saga/effects'

import dayjs from 'dayjs'
import localeDe from "dayjs/locale/ko"
import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER


// Handle request saga
function* getScheduleSaga() {  // : Generator 을 삭제함. call fn 을 unknown type으로 설정하고 있어 response 에 할당하는 것이 불가능
  try {
    const mainResp = yield call([axios, 'get'], SERVER_IP + '/calendar')
    const subResp = yield call([axios, 'get'], SERVER_IP + '/subtitle')
    const dayResp = yield call([axios, 'get'], SERVER_IP + '/todo')

    const mainSchedules = mainResp.data
    const subSchedules = subResp.data
    const daySchedules = dayResp.data

    yield put(getSchedule.success({ mainSchedules, subSchedules, daySchedules }))
  }
  catch (error) {
    yield put(getSchedule.failure(error))
  }
}

// mainSchedule
function* postMainScheduleSaga({ payload: mainSchedule }: ReturnType<typeof postMainSchedule.request>) {
  try {
    const mainResp = yield call([axios, 'post'], SERVER_IP + '/calendar', mainSchedule)
    const mainScheduleId = mainResp.data.id
    const editedMainSchedule = { ...mainSchedule, id: mainScheduleId }

    const result = yield fork(getSubScheduleOnTargetSaga, mainScheduleId)
    console.log('result', result)
    yield put(postMainSchedule.success(editedMainSchedule))
  }
  catch (error) {
    yield put(postMainSchedule.failure(error))
  }
}

function* putMainScheduleSaga({ payload: mainSchedule }: ReturnType<typeof putMainSchedule.request>) {
  try {
    yield call([axios, 'put'], SERVER_IP + '/calendar', mainSchedule)
    yield put(putMainSchedule.success(mainSchedule))
  }
  catch (error) {
    yield put(putMainSchedule.failure(error))
  }
}

function* deleteMainScheduleSaga({ payload: id }: ReturnType<typeof deleteMainSchedule.request>) {
  try {
    yield call([axios, 'delete'], SERVER_IP + '/calendar/' + id)
    yield put(deleteMainSchedule.success(id))
  }
  catch (error) {
    yield put(deleteMainSchedule.failure(error))
  }
}

function* makePublicScheduleSaga({ payload: id }: ReturnType<typeof makePublicSchedule.request>) {
  try {
    yield call([axios, 'put'], SERVER_IP + '/pbtoggle/' + id)
    yield put(makePublicSchedule.success(id))
  }
  catch (error) {
    yield put(makePublicSchedule.failure(error))
  }
}

function* makeRepresentScheduleSaga({ payload: id }: ReturnType<typeof makeRepresentSchedule.request>) {
  try {
    yield call([axios, 'put'], SERVER_IP + '/representset/' + id)
    yield put(makeRepresentSchedule.success(id))
  }
  catch (error) {
    yield put(makeRepresentSchedule.failure(error))
  }
}

function* applyScheduleToMyPlanSaga({ payload: mainSchedule }: ReturnType<typeof applyScheduleToMyPlan.request>) {
  try {
    let editedSchedule = { ...mainSchedule, id: 0 }
    let mainSchedules: MainSchedule[] = []
    let originSubSchedules: SubSchedule[] = []
    let subSchedules: SubSchedule[] = []
    let originDaySchedules: DaySchedule[] = []
    let daySchedules: DaySchedule[] = []

    // importedplan 을 myplan 에 저장하기
    const postMainResp = yield call([axios, 'post'], SERVER_IP + '/calendar', editedSchedule)
    const mainScheduleId = postMainResp.data.id
    mainSchedules.push({ ...mainSchedule, id: mainScheduleId })
    console.log('post success', mainSchedules)

    // importedplan 에 저장된 subSchedule 가져오기
    const getOriginSubResp = yield call([axios, 'get'], SERVER_IP + '/subtitle/bycalendarid/' + mainSchedule.id)
    originSubSchedules = originSubSchedules.concat(getOriginSubResp.data)
    console.log('getOriginSubResp success', originSubSchedules)

    // myplan에 새로 생긴 subSchedule(기타)가 담긴 array 만들기
    // originSubSchedule 과 newSubSchedule 을 비교하며 dayScheduele 저장할 때 새로운 subScheudule id 부여
    const getNewSubResp = yield call([axios, 'get'], SERVER_IP + '/subtitle/bycalendarid/' + mainScheduleId)
    subSchedules = subSchedules.concat(getNewSubResp.data)
    console.log('getNewSubResp success', subSchedules)

    // importedplan 에 저장된 daySchedule 가져오기
    const getOriginDayResp = yield call([axios, 'get'], SERVER_IP + '/todo/calendarid/' + mainSchedule.id)
    originDaySchedules = originDaySchedules.concat(getOriginDayResp.data)
    console.log('getOriginDayResp success', originDaySchedules)

    // subSchedule 을 가져오기 위한 날짜 게산
    const initialStartDate = dayjs(dayjs(mainSchedule.startDate))  // 메인스케줄에 포함된 목표의 첫 시작 날짜
    const initialStartDay = initialStartDate.day()  // 메인스케줄에 포함된 목표의 첫 시작 요일
    const targetDate = dayjs().locale(localeDe)
    const todayDay = targetDate.day()  // 오늘 요일

    const dayFromInitialStartDate = targetDate.diff(initialStartDate, 'day')  // 첫 시작 날짜와 오늘의 날짜 차이
    const tuneDayWithOrigin = (initialStartDay - todayDay) >= 0 ? (initialStartDay - todayDay) : (initialStartDay - todayDay) + 7  // 오늘과 첫 시작 날짜의 요일 차이 조정
    const addDays = dayFromInitialStartDate + tuneDayWithOrigin
    console.log('요일', initialStartDay, todayDay, tuneDayWithOrigin)

    // get new subSchedules
    yield originSubSchedules.map(async (originSubSchedule) => {
      if (originSubSchedule.startDate !== '9999-99-99') {
        let editedSubSchedule = { ...originSubSchedule, id: 0, calendarId: mainScheduleId, startDate: `${dayjs(originSubSchedule.startDate).add(addDays, 'day').format('YYYY-MM-DD')}`, endDate: `${dayjs(originSubSchedule.endDate).add(addDays, 'day').format('YYYY-MM-DD')}` }
        const postNewSubResp = await axios.post(SERVER_IP + '/subtitle', editedSubSchedule)
        const subSchduleId = postNewSubResp.data.id
        subSchedules.push({ ...editedSubSchedule, id: subSchduleId })

        console.log('getNewSubResp success', subSchedules)

        originDaySchedules.map(async (originDaySchedule) => {
          if (originDaySchedule.subTitleId === originSubSchedule.id) {
            let editedDaySchedule = { ...originDaySchedule, subTitleId: subSchduleId, id: 0, calendarId: mainScheduleId, date: `${dayjs(originDaySchedule.date).add(addDays, 'day').format('YYYY-MM-DD')}` }
            const postNewDayResp = await axios.post(SERVER_IP + '/todo', editedDaySchedule)
            const dayScheduleId = postNewDayResp.data.id
            daySchedules.push({ ...editedDaySchedule, id: dayScheduleId })
            console.log('success post sub', dayScheduleId)
          }
        })
      }
    })
    yield put(applyScheduleToMyPlan.success({ mainSchedules, subSchedules, daySchedules }))
  }
  catch (error) {
    yield put(applyScheduleToMyPlan.failure(error))
  }
}

// subSchedule
function* getSubScheduleSaga() {
  try {
    const resp = yield call([axios, 'get'], SERVER_IP + '/subtitle')
    const subSchedule = resp.data
    yield put(getSubSchedule.success(subSchedule))
  }
  catch (error) {
    yield put(getSubSchedule.failure(error))
  }
}

function* postSubScheduleSaga({ payload: subSchedule }: ReturnType<typeof postSubSchedule.request>) {
  try {
    const resp = yield call([axios, 'post'], SERVER_IP + '/subtitle', subSchedule)
    const subScheduleId = resp.data.id
    const editedSubSchedule = { ...subSchedule, id: subScheduleId }

    yield put(postSubSchedule.success(editedSubSchedule))
  }
  catch (error) {
    yield put(postSubSchedule.failure(error))
  }
}

function* putSubScheduleSaga({ payload: subSchedule }: ReturnType<typeof putSubSchedule.request>) {
  try {
    yield call([axios, 'put'], SERVER_IP + '/subtitle', subSchedule)
    yield put(putSubSchedule.success(subSchedule))
  }
  catch (error) {
    yield put(putSubSchedule.failure(error))
  }
}

function* deleteSubScheduleSaga({ payload: id }: ReturnType<typeof deleteSubSchedule.request>) {
  try {
    yield call([axios, 'delete'], SERVER_IP + '/subtitle/' + id)
    yield put(deleteSubSchedule.success(id))
  }
  catch (error) {
    yield put(deleteSubSchedule.failure(error))
  }
}

// 캘린더 추가했을 때 기본으로 추가되는 소목표가 리덕스에 담겨있지 않는 에러 해결을 위한 사가
function* getSubScheduleOnTargetSaga(action: ReturnType<typeof getSubScheduleOnTarget.request>) {
  try {
    const resp = yield call([axios, 'get'], SERVER_IP + '/subtitle/bycalendarid/' + action)
    const subSchedule = resp.data
    yield put(getSubScheduleOnTarget.success(subSchedule))
  }
  catch (error) {
    yield put(getSubScheduleOnTarget.failure(error))
  }
}

// daySchedule
function* postDayScheduleSaga({ payload: daySchedule }: ReturnType<typeof postDaySchedule.request>) {
  try {
    const resp = yield call([axios, 'post'], SERVER_IP + '/todo', daySchedule)
    const dayScheduleId = resp.data.id
    const editedDaySchedule = { ...daySchedule, id: dayScheduleId }

    yield put(postDaySchedule.success(editedDaySchedule))
  }
  catch (error) {
    yield put(postDaySchedule.failure(error))
  }
}

function* putDayScheduleSaga({ payload: daySchedule }: ReturnType<typeof putDaySchedule.request>) {
  try {
    yield call([axios, 'put'], SERVER_IP + '/todo', daySchedule)
    yield put(putDaySchedule.success(daySchedule))
  }
  catch (error) {
    yield put(putDaySchedule.failure(error))
  }
}

function* deleteDayScheduleSaga({ payload: id }: ReturnType<typeof deleteDaySchedule.request>) {
  try {
    yield call([axios, 'delete'], SERVER_IP + '/todo/' + id)
    yield put(deleteDaySchedule.success(id))
  }
  catch (error) {
    yield put(deleteDaySchedule.failure(error))
  }
}

// Watch saga
export function* scheduleSaga() {
  yield all([
    takeEvery(getSchedule.request, getScheduleSaga),

    takeEvery(postMainSchedule.request, postMainScheduleSaga),
    takeEvery(putMainSchedule.request, putMainScheduleSaga),
    takeEvery(deleteMainSchedule.request, deleteMainScheduleSaga),
    takeEvery(makeRepresentSchedule.request, makeRepresentScheduleSaga),
    takeEvery(makePublicSchedule.request, makePublicScheduleSaga),
    takeEvery(applyScheduleToMyPlan.request, applyScheduleToMyPlanSaga),

    takeEvery(getSubSchedule.request, getSubScheduleSaga),
    takeEvery(postSubSchedule.request, postSubScheduleSaga),
    takeEvery(putSubSchedule.request, putSubScheduleSaga),
    takeEvery(deleteSubSchedule.request, deleteSubScheduleSaga),
    takeEvery(getSubScheduleOnTarget.request, getSubScheduleOnTargetSaga),

    takeEvery(postDaySchedule.request, postDayScheduleSaga),
    takeEvery(putDaySchedule.request, putDayScheduleSaga),
    takeEvery(deleteDaySchedule.request, deleteDayScheduleSaga),
  ])
}