import {call,put,takeLatest} from 'redux-saga/effects'
import { commentServices } from '../../../services/CommentServices'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { actSetAllComment,actFetchAllCommentApi } from '../../actions/CommentActions';
import { ADD_COMMENT_API, DELETE_COMMENT_API, FETCH_ALL_COMMENT_API, UPDATE_COMMENT_API } from '../../types/CommentType'

function * fetchAllComment(action){
    const {taskId}=action;
    try{
        const {data,status}=yield call(()=>commentServices.fetchAllComment(taskId));
        if(status===STATUS_CODE.SUCCESS){
            yield put(actSetAllComment(data.content));
        }
    }catch(err){
        console.log(err);
        
    }
}
function * addComment(action){
    try{
        const {status}=yield call(()=>commentServices.addComment(action.newComment));
        if(status===STATUS_CODE.SUCCESS){
            yield put(actFetchAllCommentApi(action.newComment.taskId))
        }
    }catch(err){
        console.log(err)
    }
}
function * deleteComment(action){
    const {commentId,taskId}=action;
    try{
        const {status}=yield call(()=>commentServices.deleteComment(commentId));
        if(status===STATUS_CODE.SUCCESS){
            yield put(actFetchAllCommentApi(taskId))
        }
    }catch(err){
        console.log(err)
    }
}
function * updateComment(action){
    try{
        const {status}=yield call(()=>commentServices.updateComment(action.data));
        if(status===STATUS_CODE.SUCCESS){
            yield put(actFetchAllCommentApi(action.taskId))
        }
    }catch(err){
        console.log(err)
    }
}



export function * followAction(){
 yield takeLatest(FETCH_ALL_COMMENT_API,fetchAllComment);
 yield takeLatest(ADD_COMMENT_API,addComment);
 yield takeLatest(DELETE_COMMENT_API,deleteComment);
 yield takeLatest(UPDATE_COMMENT_API,updateComment);
}