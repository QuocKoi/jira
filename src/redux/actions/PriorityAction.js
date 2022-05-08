import { GET_ALL_PRIORITY_API, SET_ALL_PRIORITY, UPDATE_PRIORITY_API } from "../types/PriorityType"

export const actSetAllPriority=(data)=>{
    return {
        type:SET_ALL_PRIORITY,
        data
    }
}
/******************************Saga********************************/
export const actGetAllPriorityApi=()=>{
    return {
        type:GET_ALL_PRIORITY_API
    }
}
