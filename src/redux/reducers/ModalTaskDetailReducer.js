import { CHANGE_ASSINESS, CHANGE_VALUE, REMOVE_ASSIGNESS, SET_TASK_DETAILS } from "../types/ModalTaskDetailType"

const initialState = {
    infor: {
        listUserAsign: [],
        taskId: "",
        taskName: "",
        description: "",
        assigness: [],
        statusId: "",
        originalEstimate: 0,
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
        projectId: 0,
        typeId: 0,
        priorityId: 0
    }
}


const ModalTaskDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASK_DETAILS:
            let task={...action.task,typeId:action.task.priorityTask.priorityId,priorityId:action.task.taskTypeDetail.id};
            return { ...state, infor: task }
        case CHANGE_VALUE:
            const { name, value } = action;
            return { ...state, infor: { ...state.infor, [name]: value } }
        case CHANGE_ASSINESS:
            return { ...state, infor:{...state.infor,assigness:[...state.infor.assigness, action.member]} }
        case REMOVE_ASSIGNESS:
            return { ...state, infor:{...state.infor,assigness:[...state.infor.assigness].filter(member=>member.id!==action.id)} }
        default: return { ...state }
    }
   
}
export default ModalTaskDetailReducer