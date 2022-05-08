import { SET_ALL_PRIORITY } from "../types/PriorityType"

let initialState = {
    priorityList: []
}


const PriorityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PRIORITY:
            return { ...state, priorityList: action.data };
        default: return { ...state }
    }
}

export default PriorityReducer;