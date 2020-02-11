import { getSchedule } from './actions'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER


// Handle request saga
function* getScheduleSaga(action: ReturnType<typeof getSchedule.request>) {  // : Generator 을 삭제함. call fn 을 unknown type으로 설정하고 있어 response 에 할당하는 것이 불가능
  try {
    // const {data} = yield axios.get(SERVER_IP + '/calendar')
    const mainResp = yield call([axios, 'get'], SERVER_IP + '/calendar')
    const subResp = yield call([axios, 'get'], SERVER_IP + '/subtitle')
    const dayResp = yield call([axios, 'get'], SERVER_IP + '/todo')

    const mainSchedules = mainResp.data
    const subSchedules = subResp.data
    const daySchedules = dayResp.data

    yield put(getSchedule.success({ mainSchedules, subSchedules, daySchedules}))
  } 
  catch (error) {
    yield put(getSchedule.failure(error))
  }
}

// Watch saga
export function* scheduleSaga() {
  yield all([
    takeEvery(getSchedule.request, getScheduleSaga),
  ])
}