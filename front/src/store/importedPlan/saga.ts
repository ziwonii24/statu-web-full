import { getImportedSchedule, postImportedSchedule, deleteImportedSchedule } from './actions'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER


// Handle request saga
function* getImportedScheduleSaga({ payload: id }: ReturnType<typeof getImportedSchedule.request>) {  // : Generator 을 삭제함. call fn 을 unknown type으로 설정하고 있어 response 에 할당하는 것이 불가능
  try {
    const getResp = yield call([axios, 'get'], SERVER_IP + '/calendartemp/' + id)
    const importedSchedules = getResp.data

    yield put(getImportedSchedule.success(importedSchedules))
  }
  catch (error) {
    yield put(getImportedSchedule.failure(error))
  }
}

// mainSchedule
function* postImportedScheduleSaga({ payload: importedSchedule }: ReturnType<typeof postImportedSchedule.request>) {
  try {
    const postResp = yield call([axios, 'post'], SERVER_IP + '/calendartemp', importedSchedule)
    // const mainScheduleId = postResp.data.id
    // const editedMainSchedule = { ...importedSchedule, id: mainScheduleId }

    // yield put(postImportedSchedule.success(editedMainSchedule))
  }
  catch (error) {
    yield put(postImportedSchedule.failure(error))
  }
}

function* deleteImportedScheduleSaga({ payload: id }: ReturnType<typeof deleteImportedSchedule.request>) {
  try {
    yield call([axios, 'delete'], SERVER_IP + '/calendartemp/' + id)
    yield put(deleteImportedSchedule.success(id))
  }
  catch (error) {
    yield put(deleteImportedSchedule.failure(error))
  }
}

// Watch saga
export function* importedScheduleSaga() {
  yield all([
    takeEvery(getImportedSchedule.request, getImportedScheduleSaga),
    takeEvery(postImportedSchedule.request, postImportedScheduleSaga),
    takeEvery(deleteImportedSchedule.request, deleteImportedScheduleSaga),
  ])
}
