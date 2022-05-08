import { SET_TASK_API } from "../types/ToDoListType"
const initialState = {
    taskList: [],
}

const ToDoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASK_API:
            const {newTaskList}=action;
            return { ...state, taskList: newTaskList }
        default:
            return state
    }
}
export default ToDoListReducer;
