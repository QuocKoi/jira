import { SET_ALL_PROJECT, SET_EDIT_PROJECT, SET_PROJECT_DETAILS } from "../types/ProjectType";

const initialState = {
    projectList: [],
    editProject: {
        id: 0,
        projectName: "string",
        creator: 0,
        description: "string",
        categoryId: "string"
    },
    projectDetail: {}
};



const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PROJECT:
            return { ...state, projectList: action.projectList }
        case SET_EDIT_PROJECT:
            return { ...state, editProject: action.project }
        case SET_PROJECT_DETAILS:
            return { ...state, projectDetail: action.project }
        default: return { ...state };
    }
}
export default ProjectReducer