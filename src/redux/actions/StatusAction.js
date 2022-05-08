import { FETCH_ALL_STATUS_API, SET_ALL_STATUS } from "../types/StatusType"


export const actSetAllStatus = (statusList) => {
    return {
        type: SET_ALL_STATUS,
        statusList
    }
}


export const actFetchAllStatusApi = () => {
    return {
        type: FETCH_ALL_STATUS_API
    }
}
