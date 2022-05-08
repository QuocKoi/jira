import { SET_CATEGORY } from '../types/ProjectCategoryType';
const initialState = {
    category: []
};



const ProjectCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return { ...state, category: action.data }
        default: return { ...state }
    }
}
export default ProjectCategoryReducer