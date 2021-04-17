import { fork } from 'redux-saga/effects';
import watchUserAuthentication from './watchers';

/***
   * This function used for start the Sagas
   * ** */
export default function* startApplication() {
  yield fork(watchUserAuthentication);
}


