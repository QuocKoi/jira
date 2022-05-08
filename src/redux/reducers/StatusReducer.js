import { SET_ALL_STATUS } from "../types/StatusType"

const initialState = []


const StatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_STATUS:
            return state = action.statusList;
        default: return state
    }
}

export default StatusReducer