import {BaseServices} from './BaseServices' 
class CommentServices extends BaseServices{
    constructor(){
        super();
    }
    fetchAllComment=(taskId)=>{
        return this.get(`Comment/getAll?taskId=${taskId}`)
    }
    addComment=(newComment)=>{
        return this.post("Comment/insertComment",newComment)
    }
    deleteComment=(commentId)=>{
        return this.delete('Comment/deleteComment?idComment',commentId)
    }
    updateComment=(data)=>{
        return this.putComment(`Comment/updateComment?id=${data.id}&contentComment=${data.contentComment}`)
    }
}

export const commentServices=new CommentServices();