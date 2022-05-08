import { call, takeLatest, put, delay } from 'redux-saga/effects'
import { cyberBugServices } from '../../../services/CyberBugServices'
import * as ProjectType from '../../types/ProjectType'
import * as LoadingAction from '../../actions/LoadingAction'
import * as ProjectAction from '../../actions/ProjectAction'
import { STATUS_CODE } from '../../../util/constants/settingSystem'
import history from '../../../util/libs/history'
import { actFetchCategoryApi } from '../../actions/ProjectCategoryAction'
import { actHideModal } from '../../actions/ModalAction'
import Notification from '../../../components/Notification/Notification'
function* createProject(action) {
    try {
        yield put(LoadingAction.actDisplayLoading());
        yield delay(500);
        let { data, status } = yield call(() => { return cyberBugServices.createProjectAuthorize(action.project) })
        if (status === STATUS_CODE.SUCCESS) {
            history.push('/project/management');
        }
    } catch (err) {
        console.log(err)
    }
    yield put(LoadingAction.actHideLoading());
}
function* fetchAllProject() {
    yield put(LoadingAction.actDisplayLoading());
    yield delay(300);
    try {
        let { data, status } = yield call(() => { return cyberBugServices.fetchAllProject() });
        if (status === STATUS_CODE.SUCCESS) {
            yield put(ProjectAction.actSetAllProject(data.content));
            yield put(actFetchCategoryApi());
        }
    } catch (err) {
        console.log(err);
    }
    yield put(LoadingAction.actHideLoading());
}
function* updateProject(action) {
    try {
        let { data, status } = yield call(() => { return cyberBugServices.updateProject(action.project) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put(ProjectAction.actFetchAllProjectApi());
            yield put(actHideModal())
        }
    } catch (err) {
        console.log(err.response)
    }
}
function* deleteProject(action) {
    try {
        let { status } = yield call(() => { return cyberBugServices.deleteProject(action.id) });
        if (status === STATUS_CODE.SUCCESS) {
            Notification("success", "Delete is success!", '');
            yield put(ProjectAction.actFetchAllProjectApi());
        }
    } catch (err) {
        console.log(err)
    }
}
function* assignUser(action) {
    try {
        let { status } = yield call(() => { return cyberBugServices.assignUser(action.data) });
        if (status === STATUS_CODE.SUCCESS) {

            yield put(ProjectAction.actFetchAllProjectApi())
        }
    } catch (err) {
        console.log(err)
    }
}
function* removeUserFromProject(action) {
    try {
        let { status } = yield call(() => { return cyberBugServices.removeUserFromProject(action.data) });
        if (status === STATUS_CODE.SUCCESS) {
            yield put(ProjectAction.actFetchAllProjectApi())
        }
    } catch (err) {
        console.log(err)
    }
}
function* fetchProjectDetail(action) {
    try {
        let { data, status } = yield call(() => { return cyberBugServices.fetchProjectDetail(action.id) })
        if (status === STATUS_CODE.SUCCESS) {
            yield put(ProjectAction.actSetProjectDetail(data.content));
        }
    } catch (err) {
        console.log(err)
    }
}
function* createTask(action) {
    try {
        let { status } = yield call(() => { return cyberBugServices.createTask(action.task) });
        if (status === STATUS_CODE.SUCCESS) {
            Notification("success", "Create task is success!", '');
            yield put(actHideModal());
        }
    } catch (err) {
        console.log(err)
    }
}
export function* followAction() {
    yield takeLatest(ProjectType.CREATE_PROJECT_API, createProject);
    yield takeLatest(ProjectType.FETCH_ALL_PROJECT_API, fetchAllProject);
    yield takeLatest(ProjectType.UPDATE_PROJECT_API, updateProject);
    yield takeLatest(ProjectType.DELETE_PROJECT_API, deleteProject);
    yield takeLatest(ProjectType.ASSIGN_USER_API, assignUser);
    yield takeLatest(ProjectType.REMOVE_USER_FROM_PROJECT_API, removeUserFromProject);
    yield takeLatest(ProjectType.FETCH_PROJECT_DETAIL_API, fetchProjectDetail);
    yield takeLatest(ProjectType.CREATE_TASK_API, createTask);
}