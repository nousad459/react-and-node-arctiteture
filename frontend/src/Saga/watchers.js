import { takeLatest } from "redux-saga/effects";

import * as authSagas from "./authenticationSaga";

import * as type from "../Action";


/***
   * This function used for watch every action
   * ** */
export default function* watchUserAuthentication() {
  yield takeLatest(type.REGISTER_USER, authSagas.registerSaga);
  yield takeLatest(type.LOGIN_USER, authSagas.loginSaga);
}
