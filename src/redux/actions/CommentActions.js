import { ADD_COMMENT_API, FETCH_ALL_COMMENT_API, SET_ALL_COMMENT,DELETE_COMMENT_API, UPDATE_COMMENT_API } from "../types/CommentType"

export const actSetAllComment=(commentList)=>{
    return {
        type:SET_ALL_COMMENT,
        commentList
    }
}
export const actFetchAllCommentApi=(taskId)=>{
    return {
        type:FETCH_ALL_COMMENT_API,
        taskId
    }
}
export const actAddCommentApi=(newComment)=>{
    return {
        type:ADD_COMMENT_API,
        newComment
    }
}
export const actDeleteCommentApi=(commentId,taskId)=>{
    return {
        type:DELETE_COMMENT_API,
        commentId,
        taskId
    }
}
export const actUpdateCommentApi=(taskId,data)=>{
    return {
        type:UPDATE_COMMENT_API,
        data,
        taskId
    }
}