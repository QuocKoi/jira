import React, { useState, useRef } from 'react'
import { useSpring,animated } from 'react-spring';
const data = [
    { id: 1, name: "task1" },
    { id: 2, name: "task2" },
    { id: 3, name: "task3" },
    { id: 4, name: "task4" }
]
export default function DemoDragDrop() {
    const [list, setList] = useState(data);
    let taskRef = useRef({});
    let taskDragOverRef = useRef({});
    let [{top},{set}] = useSpring(()=>({
        top: 0,
        from: { top: 25 },
        config:{duration:200},
        reset:true
    }))
    const handleDragStart = (e, task) => {
        taskRef.current = task;
 
    }
    const handleDragOver = (e, task) => {
        set({top:0});
        let swap = "";
        taskDragOverRef.current={...task};
        let taskList = [...list];
        let indexTaskDragStart = taskList.findIndex(item => item.id === taskRef.current.id);
        let indexTaskDragOver = taskList.findIndex(item => item.id === task.id);
        swap = taskList[indexTaskDragStart];
        taskList[indexTaskDragStart] = taskList[indexTaskDragOver];
        taskList[indexTaskDragOver] = swap;

        setList(taskList);


    }
    const handleDragEnd = (e) => {
        console.log(e.target)
        taskRef.current = {};
        setList([...list])
    }
    
    return (
        <div className='row w-100' style={{ height: '100vh' }}>
            <div className='col-3 bg-danger'></div>
            <div className='col-6 bg-dark text-white'>
                {list.map((item, index) => {
                    let css = item.id === taskRef.current.id ? '0' : "1";
                    if(item.id===taskDragOverRef.current.id){
                        return <animated.div style={{ opacity: css, position: 'relative',top:top.to(top=>`${top}px`) }} onDragEnd={handleDragEnd} draggable='true' onDragOver={(e) => { handleDragOver(e, item, index) }} onDragStart={(e) => { handleDragStart(e, item, index) }} key={index} className='bg-success p-4 my-3'>{item.name}</animated.div>
                    }
                    return <div style={{ opacity: css }} onDragEnd={handleDragEnd} draggable='true' onDragOver={(e) => { handleDragOver(e, item, index) }} onDragStart={(e) => { handleDragStart(e, item, index) }} key={index} className='bg-success p-4 my-3'>{item.name}</div>
                })}
            </div>
            <div className='col-3 bg-warning' onDragOver={handleDragOver}></div>
        </div>
    )
}
