import axios from "axios"
import { DOMAIN } from "../util/constants/settingSystem";
export class ToDoListServices{
    constructor(){

    }
    getTaskListApi=() => {
        return axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }
    addTaskListApi=(data)=>{
        return axios({
            url: `${DOMAIN}/ToDoList/AddTask`,
            method: 'POST',
            data:{taskName:data}
        })  
    }
    deleteTaskApi=(taskName)=>{
        return axios({
            url:`${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
            method:'DELETE'
        })
    }
    doneTaskApi=(taskName)=>{
        return axios({
            url:`${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
            method:'PUT'
        })
    }
    unDoTaskApi=(taskName)=>{
        return axios({
            url:`${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
            method:'PUT'
        })
    }
}
export const toDoListServices=new ToDoListServices();
