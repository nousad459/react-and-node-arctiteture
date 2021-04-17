import { put, call } from "redux-saga/effects";
import * as auth from "../Services/authenticationServices";

import * as types from "../Action";

/***
   * Saga for User Register
   * ** */
export function* registerSaga(payload) {
  try {
    const response = yield call(auth.registerService, payload.payload);
    yield put({ type: types.REGISTER_USER_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.REGISTER_USER_ERROR, error });
  }
}

/***
   * Saga for User login
   * ** */
export function* loginSaga(payload) {
  try {
    const response = yield call(auth.loginService, payload.user);
    yield put({ type: types.LOGIN_USER_SUCCESS, response, time: new Date().getTime() });
  } catch (error) {
    yield put({ type: types.LOGIN_USER_ERROR, error, time: new Date().getTime() });
  }
}
