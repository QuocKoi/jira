import axios from 'axios'
import { call, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { ADD_TASK_API, DELETE_TASK_API, DONE_TASK_API, GET_TASKLIST_API, SET_TASK_API, UNDO_TASK_API } from '../types/ToDoListType'
import { toDoListServices } from '../../services/ToDoListServices'
import { actDisplayLoading, actHideLoading } from '../actions/LoadingAction'
import { STATUS_CODE } from '../../util/constants/settingSystem'


function* getTaskListApi(action) {
    //take theo dõi action xem action nào dispatch thì mới làm công việc ở dưới
    // while (true) {
    //     yield take('getTaskListApi');
    //      console.log('agadasdg');
    // }
    /*Call API */
    yield put(actDisplayLoading())
    try {
        let { data, status } = yield call(toDoListServices.getTaskListApi)
        //Sau khi lấy về thành công thì gửi lên reducer(dùng put giống dispatch của Thunk)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_TASK_API,
                newTaskList: data
            })
        }
        yield delay(1000);



    } catch (err) {
        console.log(err.response)
    }
    yield put(actHideLoading())
}
export function* takeActionGetTaskList() {
    yield takeLatest(GET_TASKLIST_API, getTaskListApi) //thực thi 1 loại các action và trả về action cuối

}
function* addTaskApi(action) {
    try {
        let { status } = yield call(() => { return toDoListServices.addTaskListApi(action.taskName) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({ type: GET_TASKLIST_API })
        }
    } catch (err) {

    }
}

export function* takeActionAddTask() {
    yield takeLatest(ADD_TASK_API, addTaskApi)
}

function* deleTaskApi(action) {

    try {
        let { status } = yield call(() => { return toDoListServices.deleteTaskApi(action.name) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }
    } catch (err) {

    }
}
export function* takeActionDeleteTaskApi(){
    yield takeLatest(DELETE_TASK_API,deleTaskApi)
}
function * doneTaskApi(action){
    try{
        let {status}=yield call(()=>{return toDoListServices.doneTaskApi(action.name)});
        if(status===STATUS_CODE.SUCCESS){
            yield put({type:GET_TASKLIST_API})
        }
    }catch(err){

    }
}
export function * takeActionDoneTaskApi(){
    yield takeLatest(DONE_TASK_API,doneTaskApi)
}

function * undoTaskApi(action){
    try{
        let {status}=yield call(()=>{return toDoListServices.unDoTaskApi(action.name)})
        if(status===STATUS_CODE.SUCCESS){
            yield put({type:GET_TASKLIST_API})
        }
    }catch(err){

    }
}
export function * takeActionUndoTaskApi(){
    yield takeLatest(UNDO_TASK_API,undoTaskApi)
}