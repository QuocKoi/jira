import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { actAddTask, actAddTaskApi, actDeleTask, actDeleTaskApi, actDoneTask, actDoneTaskApi, actGetTaskApi, actUndoTask, actUndoTaskApi } from '../../redux/actions/ToDoListAction'
import axios from 'axios';
export default function ToDoListRedux() {
    let [toggle, setToggle] = useState();
    let [value, setValue] = useState({ taskName: '' });
    let [error, setError] = useState({ taskName: '' });
    const { taskList } = useSelector(state => state.ToDoListReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        getTaskList()
    }, []);
    let getTaskList=()=>{
        dispatch(actGetTaskApi())
    }
    let renderTaskToDoList = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={() => { deleTask(item.taskName) }}><i className="fa fa-trash-alt" /></button>
                    <button className="complete" onClick={() => { doneTask(item.taskName) }}>
                        <i className="fa fa-check-circle " />
                    </button>
                </div>
            </li>
        })
    }
    let renderTaskCompleteList = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={() => { deleTask(item.taskName) }}><i className="fa fa-trash-alt" /></button>
                    <button className="complete" onClick={() => { undoTask(item.taskName) }}>
                        <i className="fa fa-check-circle " />
                    </button>
                </div>
            </li>
        })
    }
    let handleGetValue = (e) => {
        let { name, value } = e.target;
        setError({ ...error, [name]: value.trim() === '' ? `name is required` : '' });
        setValue({ ...value, [name]: value })
    }
    let addTask = () => {
        let index = taskList.findIndex(item => item.taskName === value.taskName);
        if (index == -1) {
        dispatch(actAddTaskApi(value.taskName))
        } else {
            return;
        }
    }
    let deleTask = (name) => {
     dispatch(actDeleTaskApi(name))
    }
    let doneTask = (name) => {
        dispatch(actDoneTaskApi(name))
    }
    let undoTask = (name) => {
        dispatch(actUndoTaskApi(name))
    }
    return (
        <div className="card">
            <div className="card__header">
                <img src={require("../../assets/img/X2oObC4.png")} />
            </div>
            {/* <h2>hello!</h2> */}
            <div className="card__body">
                <div className={`filter-btn ${toggle}`}>
                    <a id="one" href="#" ><i className="fa fa-check-circle" /></a>
                    <a id="two" href="#" ><i className="fa fa-sort-alpha-down" /></a>
                    <a id="three" href="#" ><i className="fa fa-sort-alpha-up" /></a>
                    <a id="all" href="#"><i className="fa fa-clock" /></a>
                    <span className="toggle-btn">
                        <i className="fa fa-filter" onClick={() => { setToggle('open') }} />
                        <i className="fa fa-times" onClick={() => { setToggle('') }} />
                    </span>
                </div>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p id="date">September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" name='taskName' type="text" placeholder="Enter an activity..." onChange={handleGetValue} />
                        <button id="addItem" onClick={() => { addTask() }}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <span className="text-danger" id="check_blank" >{error.taskName}</span>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDoList()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskCompleteList()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
