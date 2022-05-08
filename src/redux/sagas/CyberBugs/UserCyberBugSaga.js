import { takeLatest, call, put, delay } from 'redux-saga/effects'
import { cyberBugServices } from '../../../services/CyberBugServices';
import * as CyberBugsType from '../../types/CyberBugsType'
import { actDisplayLoading, actHideLoading } from '../../actions/LoadingAction'
import { actGetUser, actSetinform, actSetUserList } from '../../actions/UserAction'
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import history from '../../../util/libs/history';
import {DELETE_USER_API, EDIT_USER_API, GET_USER, SIGNUP_API } from '../../types/UserType';
import { userServices } from '../../../services/UserServices';
import Notification from '../../../components/Notification/Notification';
import { actHideModal } from '../../actions/ModalAction';
//Quản lý action saga
function* login(action) {
    try {
        const { account } = action;
        yield put(actDisplayLoading());
        yield delay(500);
        let { data, status } = yield call(() => { return cyberBugServices.loginCyberBugs(account) });
        if (status === STATUS_CODE.SUCCESS) {
            localStorage.setItem(TOKEN, data.content.accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
            yield put(actSetinform(data.content))
            history.push('/');
        }

    } catch (err) {
        console.log(err.response)
    }
    yield put(actHideLoading());
}
function* getUser(action) {
    try {
        let { data, status } = yield call(() => { return cyberBugServices.getUser(action.keyword) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put(actSetUserList(data.content))
        }
    } catch (err) {
        console.log(err);
    }
}
function* signup(action) {
    const { information } = action;
    try {
        const { status } = yield call(() => userServices.sigupAccount(information));
        if (status === STATUS_CODE.SUCCESS) {
            history.push('/login');
            Notification('success', 'Sign up is success!', '')
        }
    } catch (err) {
        console.log(err)
    }
}
function* deleteUser(action) {
    try {
        const { status } = yield call(() => userServices.deleteAccount(action.userId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put(actGetUser(''));
            Notification('success', 'Delete account is success!', '')
        }
    } catch (err) {
        console.log(err.response);
        const { status, data } = err.response;
        if (status === STATUS_CODE.BAD_REQUEST) {
            Notification('error', data.message, data.content)
        }


    }
}
function* editUser(action){
    try{
        const {status}=yield call(()=>userServices.editUser(action.data));
        if(status===STATUS_CODE.SUCCESS){
            yield put(actGetUser(''));
            yield put(actHideModal())
            Notification('success','Cập nhật thành công!','')
        }
    }catch(err){
        console.log(err.response)
    }
}

export function* followAction() {
    yield takeLatest(CyberBugsType.LOGIN_API, login);
    yield takeLatest(GET_USER, getUser);
    yield takeLatest(SIGNUP_API, signup);
    yield takeLatest(DELETE_USER_API, deleteUser);
    yield takeLatest(EDIT_USER_API,editUser)

}

