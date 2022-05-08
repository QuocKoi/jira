import React, { useRef } from 'react'
import { useSpring, animated, useSprings, useTransition } from 'react-spring';
import { useDispatch } from 'react-redux';
import { actSetTaskDetail } from '../../../redux/actions/ModalTaskDetailAction';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { actUpdateStatusApi } from '../../../redux/actions/TaskTypeAction';
export default function ContentCyberBugs(props) {
    const { projectDetail } = props;
    const dispatch = useDispatch();
    let renderStatusRegionList = () => {
        return projectDetail.lstTask?.map((statusRegion, index) => {
            const { statusName, lstTaskDeTail, statusId } = statusRegion;
            return <Droppable droppableId={statusId} key={index}>
                {(provided) => {
                    return <animated.div className="card" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="card-header">
                            {statusName}
                        </div>
                        <ul className="list-group list-group-flush">
                            {renderTaskDetail(lstTaskDeTail)}
                        </ul>
                        {provided.placeholder}
                    </animated.div>
                }}
            </Droppable>
        })
    }
    const renderPriority = (id) => {
        if (id == 1 || id == 2) {
            let color = "red";
            if (id == 2) {
                color = '#d36f08'
            }
            return <i style={{ color: color }} class="fa fa-arrow-up"></i>
        } else {
            return <i style={{ color: "#3cd406" }} class="fa fa-arrow-down"></i>
        }
    }
    const renderTaskDetail = (arrTaskDetail) => {
        return arrTaskDetail.map((taskDetail, indexTaskDetail) => {
            const { priorityTask, taskTypeDetail, assigness, taskName, taskId } = taskDetail;
            return <Draggable draggableId={taskId.toString()} index={indexTaskDetail} key={taskId.toString()}>
                {(provided) => {
                    return <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="list-group-item" data-bs-toggle="modal" data-bs-target="#infoModal" onClick={() => { dispatch(actSetTaskDetail(taskDetail)) }}>
                        <p className='fw-bold'>{taskName}</p>
                        <div className="block" style={{ display: 'flex' }}>
                            <div className="block-left">
                                {taskTypeDetail.id === 2 ? <i className="fa fa-bookmark" /> : <i style={{ color: 'red' }} class="fa fa-exclamation-circle"></i>}
                                {renderPriority(priorityTask.priorityId)}
                            </div>
                            <div className="block-right">
                                <div className="avatar-group" style={{ display: 'flex' }}>
                                    {assigness.map((member, indexMember) => {
                                        const { avatar } = member;
                                        return <div key={indexMember} className="avatar">
                                            <img src={avatar} alt />
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </li>
                }
                }

            </Draggable >
        })
    }
    const handleDragEnd = (result) => {
        const { draggableId, destination,source } = result;
        if(destination.droppableId==null){
            return;
        }
        if(destination.droppableId===source.droppableId &&destination.index==source.index ){
            return;
        }
        dispatch(actUpdateStatusApi(
            {
                taskId: Number(draggableId),
                statusId: destination.droppableId.toString(),
            },
            projectDetail.id
        ))
    }
    return (
        <div className="content" style={{ display: 'flex' }}>
            <DragDropContext onDragEnd={handleDragEnd}>
                {renderStatusRegionList()}
            </DragDropContext>
        </div>
    )
}

