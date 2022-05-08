import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import { actFetchAllStatusApi } from '../../../redux/actions/StatusAction';
import { actGetAllPriorityApi } from '../../../redux/actions/PriorityAction';
import { actFetchTaskTypeApi, actHandleChangePostApi } from '../../../redux/actions/TaskTypeAction';
import { Editor } from '@tinymce/tinymce-react';
import { CHANGE_ASSINESS, REMOVE_ASSIGNESS } from '../../../redux/types/ModalTaskDetailType';
import { actFetchAllCommentApi, actAddCommentApi, actDeleteCommentApi, actUpdateCommentApi } from '../../../redux/actions/CommentActions';
import _ from 'lodash';
import { Popconfirm, message } from 'antd';

export default function ModalCyberBugs(props) {
    const dispatch = useDispatch();
    const [visibleDescription, setVisibleDescription] = useState(true);
    const [visibleComment, setVisibleComment] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [newContent, setNewContent] = useState('');
    const [newComment, setNewComment] = useState('');
    const [newCommentEdit, setNewCommentEdit] = useState('');
    const [commentEditId,setCommentEditId]=useState('');
    const {
        taskTypeDetail,
        taskId,
        taskName,
        projectId,
        description,
        assigness,
        priorityTask,
        statusId,
        originalEstimate,
        timeTrackingRemaining,
        timeTrackingSpent
    } = useSelector(state => state.ModalTaskDetailReducer.infor);
    const userLogin = useSelector(state => state.UserReducer.userLogin);
    const { commentList } = useSelector(state => state.CommentReducer);
    const statusList = useSelector(state => state.StatusReducer);
    const priorityList = useSelector(state => state.PriorityReducer.priorityList);
    const taskTypeList = useSelector(state => state.TaskTypeReducer.taskTypeList);
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const persent = Math.round((timeTrackingSpent / (Number(timeTrackingSpent) + Number(timeTrackingRemaining)) * 100));
    useEffect(() => {
        dispatch(actGetAllPriorityApi());
        dispatch(actFetchAllStatusApi());
        dispatch(actFetchTaskTypeApi());
        dispatch(actFetchAllCommentApi(taskId))
    }, [taskId])
    const renderStatus = () => {
        return statusList.map((status, index) => {
            if (status.statusId == statusId) {
                return <option key={index} value={status.statusId} selected >{status.statusName}</option>
            }
            return <option key={index} value={status.statusId}>{status.statusName}</option>
        })
    }
    const renderAssignes = () => {
        return assigness?.map((member, index) => {
            const { avatar, name, id } = member;
            return <div key={index} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} className="item mb-2" onClick={() => {
                dispatch(
                    actHandleChangePostApi('', id, REMOVE_ASSIGNESS)
                )
            }}>
                <div className="avatar">
                    <img src={avatar} alt />
                </div>
                <div className="name">
                    {name}
                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                </div>
            </div>
        })
    }
    const rendePriorityList = () => {
        return priorityList?.map((item, index) => {
            const { priority, priorityId } = item;
            let select = false;
            if (priorityId === priorityTask?.priorityId) {
                select = true;
            }
            return <option selected={select} name='priorityId' key={index} value={priorityId}>{priority}</option>
        })
    }
    const renderTaskType = () => {
        return taskTypeList.map((item, index) => {
            return <option key={index} value={item.id}>{item.taskType}</option>
        })
    }
    const renderMemberNeedAdd = () => {
        return projectDetail.members?.filter(member => {
            let position = assigness?.findIndex(item => item.id == member.userId);
            if (position != -1) {
                return false
            }
            return true
        }).map((member, index) => <option key={index} value={member.userId}>{member.name}</option>)
    }
    const renderAllComment = () => {
        if (_.isArray(commentList)) {
            return commentList.map((comment, index) => {
                const { contentComment, user, id, taskId } = comment;
                let visible = 'd-none';
                let visibleEditorComment = false;
                if (userLogin.id === user.userId) {
                    visible = 'd-block'
                }
                if (commentEditId == id) {
                    visibleEditorComment = true;
                }
                return <div key={index} className="display-comment" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={user.avatar} alt />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>
                            {user.name}
                        </p>
                        <p style={{ marginBottom: 5 }}>
                            {ReactHtmlParser(contentComment)}
                        </p>
                        <div className={visibleEditorComment ? 'd-block' : `d-none`}>
                            <Editor
                                onEditorChange={(content) => { setNewCommentEdit(content) }}
                                onEC
                                initialValue={contentComment}
                                init={{
                                    height: 150,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                            <div className='editComment_btn text-start mt-3'>
                                <button className='btn btn-success me-3' onClick={()=>{handleUpdateComment(taskId,id)}}>Save</button>
                                <button className='btn btn-light ' onClick={()=>{setCommentEditId('')}}>Cancel</button>
                            </div>
                        </div>
                        <div className={visible}>
                            <div className={visibleEditorComment ? 'd-none' : `d-block`}>
                                <span className='editAndDel me-2' onClick={()=>{setCommentEditId(id)}}>Edit</span>
                                •
                                <Popconfirm
                                    title="Are you sure to delete this task?"
                                    onConfirm={() => { handleDeleteComment(id,taskId) }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <span className='editAndDel ms-2'>Delete</span>
                                </Popconfirm>
                            </div>
                        </div>
                    </div>
                </div>
            })
        } else {
            return ''
        }

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(actHandleChangePostApi(name, value, ''))
    }
    const handleAddComment = () => {
        if (newComment !== '') {
            dispatch(actAddCommentApi(
                {
                    taskId: taskId,
                    contentComment: newComment
                }
            ));
            setVisibleComment(!visibleComment);
        } else {
            return;
        }
    }
    const handleUpdateComment=(taskId,commentId)=>{
        if(newCommentEdit!==''){
            dispatch(actUpdateCommentApi(taskId,{id:commentId,contentComment:newCommentEdit}));
            setCommentEditId('');
        }
    }
    const handleDeleteComment=(commentId,taskId)=>{
        dispatch(actDeleteCommentApi(commentId, taskId))
    }
    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <span>TASK-217871</span>
                            <select defaultValue={taskTypeDetail?.taskType} name='typeId' onChange={handleChange}>
                                {renderTaskType()}
                            </select>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">{taskName}</p>
                                    <div className="description mb-3">
                                        <p>Description</p>
                                        <p className={visibleDescription ? "d-block" : 'd-none'} onClick={() => { setVisibleDescription(false) }}>
                                            {ReactHtmlParser(description)}
                                        </p>
                                        <div className={visibleDescription ? 'd-none' : 'd-block'}>
                                            <Editor
                                                initialValue={description}
                                                onEditorChange={(content) => { setNewContent(content) }}
                                                init={{
                                                    height: 500,
                                                    menubar: false,
                                                    plugins: [
                                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                                    ],
                                                    toolbar: 'undo redo | blocks | ' +
                                                        'bold italic forecolor | alignleft aligncenter ' +
                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                        'removeformat | help',
                                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
                                                }}
                                            />
                                            <div className='description_btn text-end mt-3'>
                                                <button className='btn btn-success me-3' onClick={() => { setVisibleDescription(true); dispatch(actHandleChangePostApi('description', newContent)) }}>Save</button>
                                                <button className='btn btn-success ' onClick={() => { setVisibleDescription(true) }}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={userLogin.avatar} alt />
                                            </div>
                                            <div className="input-comment w-100">
                                                <div className={visibleComment ? 'd-block add-comment' : 'd-none'} onClick={() => { setVisibleComment(!visibleComment) }}>Add a comment...</div>
                                                <p className={visibleComment ? 'd-block' : 'd-none'}>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p>
                                                <div className={visibleComment ? 'd-none' : 'd-block'}>
                                                    <Editor
                                                        onEditorChange={(content) => { setNewComment(content) }}
                                                        init={{
                                                            height: 150,
                                                            menubar: false,
                                                            plugins: [
                                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                                            ],
                                                            toolbar: 'undo redo | blocks | ' +
                                                                'bold italic forecolor | alignleft aligncenter ' +
                                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                'removeformat | help',
                                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                        }}
                                                    />
                                                    <div className='btn-comment mt-2'>
                                                        <button className='btn btn-primary me-2' onClick={() => { handleAddComment() }}>Save</button>
                                                        <button className='btn btn-light' onClick={() => { setVisibleComment(!visibleComment) }}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                {renderAllComment()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select className="custom-select" name='statusId' onChange={handleChange}>
                                            {renderStatus()}
                                        </select>
                                    </div>
                                    <div className="assignees" >
                                        <h6>ASSIGNEES</h6>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }} >
                                            {renderAssignes()}

                                            <p className='fw-bold' style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { setToggle(true) }}>+ Add more</p>
                                            <select className={`form-select ${toggle ? "d-block" : "d-none"}`} onChange={(e) => {
                                                const { value } = e.target;
                                                if (value == 0) { return }
                                                let memberSelect = projectDetail.members?.find(member => member.userId.toString() == value);
                                                memberSelect = { ...memberSelect, id: memberSelect.userId }
                                                setToggle(false);
                                                dispatch(actHandleChangePostApi('', memberSelect, CHANGE_ASSINESS))
                                            }} >
                                                <option selected value={0}>Choose Select</option>
                                                {renderMemberNeedAdd()}
                                            </select>


                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select className='w-100' name='priorityId' onChange={handleChange}>
                                            {rendePriorityList()}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input type="text" value={originalEstimate} name='originalEstimate' className="estimate-hours" onChange={handleChange} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        <div style={{ display: 'flex' }}>
                                            <i className="fa fa-clock" />
                                            <div style={{ width: '100%' }}>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: `${persent}%` }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className="logged">{timeTrackingSpent}h logged</p>
                                                    <p className="estimate-time">{timeTrackingRemaining}h estimated</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex'>
                                            <input name='timeTrackingSpent' className='me-2 w-100' onChange={handleChange}></input>
                                            <input name='timeTrackingRemaining' className='w-100' onChange={handleChange}></input>
                                        </div>

                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
