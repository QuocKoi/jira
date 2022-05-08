import {FETCH_ALL_TASKTYPE_API, HANDLE_CHANGE_POST_API, SET_TASKTYPE, UPDATE_TASK_API, UPDATE_TASK_STATUS_API} from '../types/TaskTypeConstant'


export const actSetTaskType=(list)=>{
    return {
        type:SET_TASKTYPE,
        list
    }
}
export const actFetchTaskTypeApi=()=>{
    return {
        type:FETCH_ALL_TASKTYPE_API
    }
}
export const actUpdateTaskApi=(newTask,projectId)=>{
    return {
        type:UPDATE_TASK_API,
        newTask,
        projectId
    }
}
export const actHandleChangePostApi=(name,value,actionType)=>{
    return {
        type:HANDLE_CHANGE_POST_API,
        name,
        value,
        actionType,
    }
}
export const actUpdateStatusApi=(data,projectId)=>{
    return {
        type:UPDATE_TASK_STATUS_API,
        data,
        projectId
    }
}