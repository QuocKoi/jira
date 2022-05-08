import { CHANGE_ASSINESS, CHANGE_VALUE, REMOVE_ASSIGNESS, SET_TASK_DETAILS } from "../types/ModalTaskDetailType"

export const actSetTaskDetail=(task)=>{
    return {type:SET_TASK_DETAILS,task}
}
export const actChangeValue=(name,value)=>{
    return{
        type:CHANGE_VALUE,
        name,
        value
    }
}
export const actChangeAssigness=(member)=>{
    return {type:CHANGE_ASSINESS,
    member}
}
export const actRemoveAssigness=(id)=>{
    return {
        type:REMOVE_ASSIGNESS,
        id
    }
}