import { setTargetUserInfo } from './actions'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '.env') })
const SERVER_IP = process.env.REACT_APP_TEST_SERVER

// Handle request saga
function* setTargetUserInfoSaga({ payload: userId }: ReturnType<typeof setTargetUserInfo.request>) {  
  try {
    const resp = yield call([axios, 'get'], SERVER_IP + '/user/id/' + userId)
    const targetUserInfo = resp.data

    yield put(setTargetUserInfo.success(targetUserInfo))
  }
  catch (error) {
    yield put(setTargetUserInfo.failure(error))
  }
}


// Watch saga
export function* userSaga() {
  yield all([
    takeEvery(setTargetUserInfo.request, setTargetUserInfoSaga)
  ])
}
