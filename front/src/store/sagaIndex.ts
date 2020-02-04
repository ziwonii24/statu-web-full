import React from 'react'
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth/auth';
import user, { userSaga } from '../store/auth/user';

export function* rootSaga() {
    yield all([authSaga(), userSaga()]);
}