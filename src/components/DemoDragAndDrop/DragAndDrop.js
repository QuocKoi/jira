import React, { useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
export default function DragAndDrop() {
    const [state, setState] = useState({
        todo: {
            id: "todo",
            task: [
                { id: "1a", taskName: 'task1' },
                { id: "2a", taskName: 'task2' },
                { id: "aa", taskName: 'task3' }
            ]
        },
        progress: {
            id: 'progress',
            task: [
                { id: "1b", taskName: 'task4' },
                { id: "2b", taskName: 'task5' },
                { id: "3b", taskName: 'task6' }
            ]
        },
        done: {
            id: "done",
            task: [
                { id: "1c", taskName: 'task7' },
                { id: "2c", taskName: 'task8' },
                { id: "3c", taskName: 'task9' }
            ]
        }
    });
    const renderTask = (arrTask) => {
        return arrTask.map((task, index) => {
            return <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => {
                    return <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='p-3 bg-success text-white' >{task.taskName}</div>
                }}

            </Draggable>
        })
    }
    const handleDragEnd = (result) => {
        console.log(result);
        let newState={...state};
        const { destination, source,draggableId } = result;
        if (destination === null) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        // if (destination.droppableId === source.droppableId) {
    
        // }
        let taskDrag=newState[source.droppableId].task.find(item=>item.id===draggableId);
        let taskDropSource=newState[source.droppableId].task.filter(item=>item.id!==draggableId);
        newState[source.droppableId].task=taskDropSource;
        let taskDropDestination=newState[destination.droppableId].task.splice(destination.index,0,taskDrag);
        setState(newState)
       
        
    }
    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='row'>
                    {_.map(state, (key, index) => {
                        return <Droppable droppableId={key.id}>
                            {(provided) => {
                                return <div className='col-4 p-5 bg-dark' key={index} ref={provided.innerRef} {...provided.droppableProps}>
                                    {renderTask(key.task)}
                                    {provided.placeholder}
                                </div>

                            }}
                        </Droppable>
                    })}
                </div>

            </DragDropContext>
        </div>
    )
}
