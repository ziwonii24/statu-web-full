import {
  getSchedule,
  makeRepresentSchedule,
  makePublicSchedule,
  applyScheduleToMyPlan,
  undoRepresentSchedule,
  getMainTerm,
  postMainSchedule,
  putMainSchedule,
  deleteMainSchedule,
  getSubSchedule,
  postSubSchedule,
  putSubSchedule,
  deleteSubSchedule,
  getSubScheduleOnTarget,
  postDaySchedule,
  putDaySchedule,
  deleteDaySchedule
} from "./actions";
import { MainSchedule, SubSchedule, DaySchedule } from "./types";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { sortDate } from "../../components/Calendar/MonthView/utils/index";

import dayjs from "dayjs";
import localeDe from "dayjs/locale/ko";
import axios from "axios";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, ".env") });
const SERVER_IP = process.env.REACT_APP_TEST_SERVER;

// Handle request saga
function* getScheduleSaga({
  payload: id
}: ReturnType<typeof getSchedule.request>) {
  // : Generator 을 삭제함. call fn 을 unknown type으로 설정하고 있어 response 에 할당하는 것이 불가능
  try {
    const mainResp = yield call([axios, "get"], SERVER_IP + "/calendar");
    const subResp = yield call([axios, "get"], SERVER_IP + "/subtitle");
    const dayResp = yield call([axios, "get"], SERVER_IP + "/todo");
    const myDayReap = yield call(
      [axios, "get"],
      SERVER_IP + "/todo/userid/" + id
    );

    const mainSchedules = mainResp.data;
    const subSchedules = subResp.data;
    const daySchedules = dayResp.data;
    const myDaySchedules = myDayReap.data;

    yield put(
      getSchedule.success({
        mainSchedules,
        subSchedules,
        daySchedules,
        myDaySchedules
      })
    );
  } catch (error) {
    yield put(getSchedule.failure(error));
  }
}

// mainSchedule
function* postMainScheduleSaga({
  payload: mainSchedule
}: ReturnType<typeof postMainSchedule.request>) {
  try {
    const mainResp = yield call(
      [axios, "post"],
      SERVER_IP + "/calendar",
      mainSchedule
    );
    const mainScheduleId = mainResp.data.id;
    const editedMainSchedule = { ...mainSchedule, id: mainScheduleId };

    yield put(getSubScheduleOnTarget.request(mainScheduleId));
    yield put(postMainSchedule.success(editedMainSchedule));
  } catch (error) {
    yield put(postMainSchedule.failure(error));
  }
}

function* putMainScheduleSaga({
  payload: mainSchedule
}: ReturnType<typeof putMainSchedule.request>) {
  try {
    yield call([axios, "put"], SERVER_IP + "/calendar", mainSchedule);
    yield put(putMainSchedule.success(mainSchedule));
  } catch (error) {
    yield put(putMainSchedule.failure(error));
  }
}

function* deleteMainScheduleSaga({
  payload: id
}: ReturnType<typeof deleteMainSchedule.request>) {
  try {
    yield call([axios, "delete"], SERVER_IP + "/calendar/" + id);
    yield put(deleteMainSchedule.success(id));
  } catch (error) {
    yield put(deleteMainSchedule.failure(error));
  }
}

function* makePublicScheduleSaga({
  payload: id
}: ReturnType<typeof makePublicSchedule.request>) {
  try {
    yield call([axios, "put"], SERVER_IP + "/pbtoggle/" + id);
    yield put(makePublicSchedule.success(id));
  } catch (error) {
    yield put(makePublicSchedule.failure(error));
  }
}

function* makeRepresentScheduleSaga({
  payload: id
}: ReturnType<typeof makeRepresentSchedule.request>) {
  try {
    yield call([axios, "put"], SERVER_IP + "/representset/" + id);
    yield put(makeRepresentSchedule.success(id));
  } catch (error) {
    yield put(makeRepresentSchedule.failure(error));
  }
}

function* undoRepresentScheduleSaga({
  payload: id
}: ReturnType<typeof undoRepresentSchedule.request>) {
  try {
    yield call([axios, "put"], SERVER_IP + "/representoff/" + id);
    yield put(undoRepresentSchedule.success(id));
  } catch (error) {
    yield put(undoRepresentSchedule.failure(error));
  }
}

function* applyScheduleToMyPlanSaga({
  payload: mainSchedule
}: ReturnType<typeof applyScheduleToMyPlan.request>) {
  try {
    let mainSchedules: MainSchedule[] = [];  // 내 공부 탭으로 가져온 캘린더
    let originSubSchedules: SubSchedule[] = [];  // 가져올 기간 스케줄
    let subSchedules: SubSchedule[] = [];  // 가져온 기간 스케줄
    let originDaySchedules: DaySchedule[] = [];  // 가져올 일일 스케줄
    let daySchedules: DaySchedule[] = [];  // 가져온 일일 스케줄

    // subSchedule 을 가져오기 위한 날짜 게산
    // 메인스케줄에 포함된 목표의 첫 시작 날짜
    const initialStartDate = dayjs(dayjs(mainSchedule.startDate)); 
    // 메인스케줄에 포함된 목표의 첫 시작 요일
    const initialStartDay = initialStartDate.day(); 
    // 오늘 날짜
    const targetDate = dayjs().locale(localeDe);
    // 오늘 요일
    const todayDay = targetDate.day(); 

    // 첫 시작 날짜와 오늘의 날짜 차이
    const dayFromInitialStartDate = targetDate.diff(initialStartDate, "day"); 
    // 오늘과 첫 시작 날짜의 요일 차이 조정
    const tuneDayWithOrigin =
      initialStartDay - todayDay >= 0
        ? initialStartDay - todayDay
        : initialStartDay - todayDay + 7; 
    // 조정할 일수 차이
    const addDays = dayFromInitialStartDate + tuneDayWithOrigin;

    // post 요청 보낼 calendar data 설정
    const mainScheduleStartDate = dayjs(mainSchedule.startDate)
      .add(addDays, "day")
      .format("YYYY-MM-DD");
    const mainScheduleEndDate = dayjs(mainSchedule.endDate)
      .add(addDays, "day")
      .format("YYYY-MM-DD");

    let editedSchedule = {
      ...mainSchedule,
      id: 0,
      startDate: mainScheduleStartDate,
      endDate: mainScheduleEndDate
    };

    // 가져올 캘린더를 mainSchedules 에 저장하기
    const postMainResp = yield call(
      [axios, "post"],
      SERVER_IP + "/calendar",
      editedSchedule
    );
    const mainScheduleId = postMainResp.data.id;
    mainSchedules.push({ ...editedSchedule, id: mainScheduleId });

    // 내 공부 에 저장할 기간 스케줄 가져오기
    const getOriginSubResp = yield call(
      [axios, "get"],
      SERVER_IP + "/subtitle/bycalendarid/" + mainSchedule.id
    );
    originSubSchedules = originSubSchedules.concat(getOriginSubResp.data);

    // 내 공부 에 캘린더를 만들 때 자동으로 생긴 subSchedule(기타)을 subSchedules 에 담기
    // originSubSchedule 과 newSubSchedule 을 비교하며 dayScheduele 저장할 때 새로운 subScheudule id 부여
    const getNewSubResp = yield call(
      [axios, "get"],
      SERVER_IP + "/subtitle/bycalendarid/" + mainScheduleId
    );
    subSchedules = subSchedules.concat(getNewSubResp.data);
    const etcSubScheduleId = getNewSubResp.data[0].id

    // 내 공부 에 저장할 일일 스케줄 가져오기
    const getOriginDayResp = yield call(
      [axios, "get"],
      SERVER_IP + "/todo/calendarid/" + mainSchedule.id
    );
    originDaySchedules = originDaySchedules.concat(getOriginDayResp.data);

    // 가져올 기간 스케줄과 일일 스케줄을 subSchedules, daySchedules 에 저장하기
    for (let i = 0; i < originSubSchedules.length; i++) {
      let subScheduleId = etcSubScheduleId

      // 가져올 기간 스케줄이 기타가 아닐 때 subSchedules 에 저장하기
      if (originSubSchedules[i].startDate !== "9999-99-99") {
        let editedSubSchedule = {
          ...originSubSchedules[i],
          id: 0,
          calendarId: mainScheduleId,
          startDate: `${dayjs(originSubSchedules[i].startDate)
            .add(addDays, "day")
            .format("YYYY-MM-DD")}`,
          endDate: `${dayjs(originSubSchedules[i].endDate)
            .add(addDays, "day")
            .format("YYYY-MM-DD")}`
        };
        const postNewSubResp = yield call(
          [axios, "post"],
          SERVER_IP + "/subtitle",
          editedSubSchedule
        );
        subScheduleId = postNewSubResp.data.id;
        subSchedules.push({ ...editedSubSchedule, id: subScheduleId });
      }

      // 기간 스케줄에 맞게 가져올 일일 스케줄 daySchedules 에 저장하기
      for (let j = 0; j < originDaySchedules.length; j++) {
        if (originDaySchedules[j].subTitleId === originSubSchedules[i].id) {
          let editedDaySchedule = {
            ...originDaySchedules[j],
            calendarId: mainScheduleId,
            subTitleId: subScheduleId,
            id: 0,
            acheive: 0,
            date: `${dayjs(originDaySchedules[j].date)
              .add(addDays, "day")
              .format("YYYY-MM-DD")}`
          };
          const postNewDayResp = yield call(
            [axios, "post"],
            SERVER_IP + "/todo",
            editedDaySchedule
          );
          const dayScheduleId = postNewDayResp.data.id;
          daySchedules.push({ ...editedDaySchedule, id: dayScheduleId });
          console.log(originDaySchedules[j], originSubSchedules[i], daySchedules)
        }
      }
    }

    // dispatch 요청 보내기
    const myDaySchedules = daySchedules;
    yield put(
      applyScheduleToMyPlan.success({
        mainSchedules,
        subSchedules,
        daySchedules,
        myDaySchedules
      })
    );
  } catch (error) {
    yield put(applyScheduleToMyPlan.failure(error));
  }
}

function* getMainTermSaga({
  payload: id
}: ReturnType<typeof getMainTerm.request>) {
  try {
    const getMainResp = yield call(
      [axios, "get"],
      SERVER_IP + "/calendar/0/" + id
    );
    const initialMainSchedule = getMainResp.data;
    const getSubResp = yield call(
      [axios, "get"],
      SERVER_IP + "/subtitle/bycalendarid/" + id
    );
    const subSchedules = getSubResp.data;
    const getDayResp = yield call(
      [axios, "get"],
      SERVER_IP + "/todo/calendarid/" + id
    );
    const daySchedules = getDayResp.data;

    let minStartDate = "9999-99-99";
    let maxEndDate = "0000-00-00";
    subSchedules.map((schedule: SubSchedule) => {
      if (schedule.startDate === "9999-99-99") return;
      if (sortDate(schedule.startDate, minStartDate) < 0) {
        minStartDate = schedule.startDate;
      }
      if (sortDate(schedule.endDate, maxEndDate) > 0) {
        maxEndDate = schedule.endDate;
      }
    });
    daySchedules.map((schedule: DaySchedule) => {
      if (sortDate(schedule.date, minStartDate) < 0) {
        minStartDate = schedule.date;
      }
      if (sortDate(schedule.date, maxEndDate) > 0) {
        maxEndDate = schedule.date;
      }
    });

    const editedMainSchedule = {
      ...initialMainSchedule,
      startDate: minStartDate,
      endDate: maxEndDate
    };
    yield put(putMainSchedule.request(editedMainSchedule));
  } catch (error) {
    yield put(getMainTerm.failure(error));
  }
}

// subSchedule
function* getSubScheduleSaga() {
  try {
    const resp = yield call([axios, "get"], SERVER_IP + "/subtitle");
    const subSchedule = resp.data;
    yield put(getSubSchedule.success(subSchedule));
  } catch (error) {
    yield put(getSubSchedule.failure(error));
  }
}

function* postSubScheduleSaga({
  payload: subSchedule
}: ReturnType<typeof postSubSchedule.request>) {
  try {
    const resp = yield call(
      [axios, "post"],
      SERVER_IP + "/subtitle",
      subSchedule
    );
    const subScheduleId = resp.data.id;
    const editedSubSchedule = { ...subSchedule, id: subScheduleId };

    yield put(postSubSchedule.success(editedSubSchedule));
  } catch (error) {
    yield put(postSubSchedule.failure(error));
  }
}

function* putSubScheduleSaga({
  payload: subSchedule
}: ReturnType<typeof putSubSchedule.request>) {
  try {
    yield call([axios, "put"], SERVER_IP + "/subtitle", subSchedule);
    yield put(putSubSchedule.success(subSchedule));
  } catch (error) {
    yield put(putSubSchedule.failure(error));
  }
}

function* deleteSubScheduleSaga({
  payload: id
}: ReturnType<typeof deleteSubSchedule.request>) {
  try {
    yield call([axios, "delete"], SERVER_IP + "/subtitle/" + id);
    yield put(deleteSubSchedule.success(id));
  } catch (error) {
    yield put(deleteSubSchedule.failure(error));
  }
}

// 캘린더 추가했을 때 기본으로 추가되는 소목표가 리덕스에 담겨있지 않는 에러 해결을 위한 사가
function* getSubScheduleOnTargetSaga({
  payload: id
}: ReturnType<typeof getSubScheduleOnTarget.request>) {
  try {
    const resp = yield call(
      [axios, "get"],
      SERVER_IP + "/subtitle/bycalendarid/" + id
    );
    const subSchedule = resp.data;
    yield put(getSubScheduleOnTarget.success(subSchedule));
  } catch (error) {
    yield put(getSubScheduleOnTarget.failure(error));
  }
}

// daySchedule
function* postDayScheduleSaga({
  payload: daySchedule
}: ReturnType<typeof postDaySchedule.request>) {
  try {
    const resp = yield call([axios, "post"], SERVER_IP + "/todo", daySchedule);
    const dayScheduleId = resp.data.id;
    const editedDaySchedule = { ...daySchedule, id: dayScheduleId };

    yield put(postDaySchedule.success(editedDaySchedule));
  } catch (error) {
    yield put(postDaySchedule.failure(error));
  }
}

function* putDayScheduleSaga({
  payload: daySchedule
}: ReturnType<typeof putDaySchedule.request>) {
  try {
    yield call([axios, "put"], SERVER_IP + "/todo", daySchedule);
    yield put(putDaySchedule.success(daySchedule));
  } catch (error) {
    yield put(putDaySchedule.failure(error));
  }
}

function* deleteDayScheduleSaga({
  payload: id
}: ReturnType<typeof deleteDaySchedule.request>) {
  try {
    yield call([axios, "delete"], SERVER_IP + "/todo/" + id);
    yield put(deleteDaySchedule.success(id));
  } catch (error) {
    yield put(deleteDaySchedule.failure(error));
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
    takeEvery(undoRepresentSchedule.request, undoRepresentScheduleSaga),
    takeEvery(applyScheduleToMyPlan.request, applyScheduleToMyPlanSaga),
    takeEvery(getMainTerm.request, getMainTermSaga),

    takeEvery(getSubSchedule.request, getSubScheduleSaga),
    takeEvery(postSubSchedule.request, postSubScheduleSaga),
    takeEvery(putSubSchedule.request, putSubScheduleSaga),
    takeEvery(deleteSubSchedule.request, deleteSubScheduleSaga),
    takeEvery(getSubScheduleOnTarget.request, getSubScheduleOnTargetSaga),

    takeEvery(postDaySchedule.request, postDayScheduleSaga),
    takeEvery(putDaySchedule.request, putDayScheduleSaga),
    takeEvery(deleteDaySchedule.request, deleteDayScheduleSaga)
  ]);
}
