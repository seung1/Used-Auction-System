import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      console.log("123");
      console.log(type);
      const response = yield call(request, action.payload);
      console.log(response);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
      console.log("22");
    } catch (e) {
      console.log("1");
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
      console.log("55");
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
