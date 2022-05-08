import { SET_ALL_COMMENT } from "../types/CommentType"

const initialState={
    commentList:[]
}

const CommentReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_ALL_COMMENT:
        return {...state,commentList:action.commentList}
        default: return {...state}
    }
}
export default CommentReducer