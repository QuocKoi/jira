import { SET_TASKTYPE } from "../types/TaskTypeConstant"

let initialState = {
    taskTypeList: []
}


const TaskTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKTYPE:
            return { ...state, taskTypeList: action.list }
        default: return { ...state }
    }
}
export default TaskTypeReducer