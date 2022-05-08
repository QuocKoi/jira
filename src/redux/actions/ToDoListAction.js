import axios from "axios";
import { SET_TASK_API } from "../types/ToDoListType";
import { toDoListServices } from '../../services/ToDoListServices'
import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType";
export const actGetTaskApi = () => {
    // C1 return dispatch => {
    //     axios({
    //         url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
    //         method: 'GET'
    //     }).then(result => dispatch(
    //         {
    //             type: GET_TASK_API,
    //             newTaskList: result.data
    //         }
    //     ))

    // }
    /*c2:*/
    return async (dispatch) => {
        try {
            dispatch({ type: DISPLAY_LOADING });
            let { data } = await toDoListServices.getTaskListApi();
         
            dispatch({
                type: SET_TASK_API,
                newTaskList: data
            })
            setTimeout(()=>{
                dispatch({ type: HIDE_LOADING });  
            },300)
            
        } catch (err) {
            console.log(err.response)
        }
    }
}
export const actAddTaskApi = (name) => {
    return dispatch => {
        axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: name }
        }).then(() => { dispatch(actGetTaskApi()) })
    }
}

export const actDeleTaskApi = (name) => {
    return dispatch => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${name}`,
            method: 'DELETE',
        }).then((result) => {
            dispatch(actGetTaskApi())
        })
    }
}

export const actDoneTaskApi = (name) => {
    return dispatch => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${name}`,
            method: 'PUT'
        }).then(() => {
            dispatch(actGetTaskApi())
        })
    }
}

export const actUndoTaskApi = (name) => {
    return dispatch => {
        axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${name}`,
            method: 'PUT'
        }).then(() => {
            dispatch(actGetTaskApi())
        })
    }
}