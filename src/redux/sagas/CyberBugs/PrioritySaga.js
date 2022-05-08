import { takeLatest, call, delay, put } from 'redux-saga/effects'
import { GET_ALL_PRIORITY_API, UPDATE_PRIORITY_API } from '../../types/PriorityType'
import { cyberBugServices } from '../../../services/CyberBugServices'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { actSetAllPriority } from '../../actions/PriorityAction';
import { actFetchProjectDetailApi } from '../../actions/ProjectAction';
function* fetchAllPriority() {
    try {
        let { data, status } = yield call(() => { return cyberBugServices.fetchAllPriority() });
        if (status === STATUS_CODE.SUCCESS) {
            yield put(actSetAllPriority(data.content));
        }
    } catch (err) {
        console.log(err)
    }
}



export function* followAction() {
    yield takeLatest(GET_ALL_PRIORITY_API, fetchAllPriority);

}