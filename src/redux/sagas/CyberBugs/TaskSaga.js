import { call, put, takeLatest, select } from 'redux-saga/effects'
import { cyberBugServices } from '../../../services/CyberBugServices'
import { FETCH_ALL_TASKTYPE_API, UPDATE_TASK_API, HANDLE_CHANGE_POST_API, UPDATE_TASK_STATUS_API } from '../../types/TaskTypeConstant'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import { actSetTaskType } from '../../actions/TaskTypeAction'
import { actFetchProjectDetailApi } from '../../actions/ProjectAction'
import { CHANGE_ASSINESS, REMOVE_ASSIGNESS } from '../../types/ModalTaskDetailType'
import history from '../../../util/libs/history'
import { actChangeAssigness, actChangeValue, actRemoveAssigness } from '../../actions/ModalTaskDetailAction'
function* fetchAllTaskType() {
    try {
        let { data, status } = yield call(() => { return cyberBugServices.fetchAllTaskType() })
        if (status === STATUS_CODE.SUCCESS) {
            yield put(actSetTaskType(data.content))
        }
    } catch (err) {
        console.log(err)
    }
}
function* updateTask(action) {
    try {
        const { status } = yield call(() => cyberBugServices.updateTask(action.newTask));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(actFetchProjectDetailApi(action.projectId))
        }
    } catch (err) {
        console.log(err)
    }
}
function* handleChangePostApi(action) {
    const { name, value, actionType } = action;
    switch (actionType) {
        case CHANGE_ASSINESS:
            yield put(actChangeAssigness(value));
        case REMOVE_ASSIGNESS:
            yield put(actRemoveAssigness(value));
        default:
            yield put(actChangeValue(name, value));
    }
    let { infor } = yield select(state => state.ModalTaskDetailReducer);
    //Biến đổi dữ liệu gửi lên API
    const listUserAsign = infor.assigness?.map((user, index) => {
        return user.id
    })
    let newTask = {...infor,listUserAsign};
    try {
        const { status } = yield call(() => cyberBugServices.updateTask(newTask));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(actFetchProjectDetailApi(infor.projectId))
        }
    }catch(err){
        console.log(err.response)
    }
}
function* updateTaskStatus(action){
    console.log('updataStatus',action.data)
    try{
        const {status}=yield call(()=>cyberBugServices.updateStatus(action.data));
        if(status===STATUS_CODE.SUCCESS){
            yield put(actFetchProjectDetailApi(action.projectId))
        }
    }catch(err){
        console.log(err.response)
    }
}
export function* followAction() {
    yield takeLatest(FETCH_ALL_TASKTYPE_API, fetchAllTaskType);
    yield takeLatest(UPDATE_TASK_API, updateTask);
    yield takeLatest(HANDLE_CHANGE_POST_API, handleChangePostApi);
    yield takeLatest(UPDATE_TASK_STATUS_API,updateTaskStatus)
}