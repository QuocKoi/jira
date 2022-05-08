import { call, put, takeLatest } from 'redux-saga/effects'
import { statusServices } from '../../../services/StatusServices'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { actFetchProjectDetailApi } from '../../actions/ProjectAction';
import { actSetAllStatus } from '../../actions/StatusAction';
import { FETCH_ALL_STATUS_API, UPDATE_STATUS_API } from '../../types/StatusType';
function* fetchAllStatus() {
    try {
        let { data, status } = yield call(() => { return statusServices.fetchAllStatus() });
        if (status === STATUS_CODE.SUCCESS) {
            yield put(actSetAllStatus(data.content));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* followAction() {
    yield takeLatest(FETCH_ALL_STATUS_API, fetchAllStatus);
  
}