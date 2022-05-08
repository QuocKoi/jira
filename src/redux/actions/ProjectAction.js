import * as ProjectType from "../types/ProjectType"
export const actSetAllProject = (projectList) => {
    return {
        type: ProjectType.SET_ALL_PROJECT,
        projectList
    }
}
export const actSetEditProject = (project) => {
    return {
        type: ProjectType.SET_EDIT_PROJECT,
        project
    }
}
export const actSetProjectDetail=(project)=>{
    return {
        type:ProjectType.SET_PROJECT_DETAILS,
        project
    }
}


/*****************************Saga********************************* */
export const actCreateProjectApi = (project) => {
    return {
        type: ProjectType.CREATE_PROJECT_API,
        project
    }
}
export const actFetchAllProjectApi = () => {
    return {
        type: ProjectType.FETCH_ALL_PROJECT_API
    }
}
export const actUpdateProjectApi = (project) => {
    return {
        type: ProjectType.UPDATE_PROJECT_API,
        project
    }
}
export const actDeleteProjectApi = (id) => {
    return {
        type: ProjectType.DELETE_PROJECT_API,
        id
    }
}
export const actAssignUserApi = (data) => {
    return {
        type: ProjectType.ASSIGN_USER_API,
        data
    }
}
export const actRemoveUserFromProject = (data) => {
    return {
        type: ProjectType.REMOVE_USER_FROM_PROJECT_API,
        data
    }
}
export const actFetchProjectDetailApi=(id)=>{
    return {
        type:ProjectType.FETCH_PROJECT_DETAIL_API,
        id
    }
}
export const actCreateTaskApi=(task)=>{
    return {
        type:ProjectType.CREATE_TASK_API,
        task
    }
}