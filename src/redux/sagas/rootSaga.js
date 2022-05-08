import {all} from 'redux-saga/effects'
import * as ToDoListSaga from './ToDoListSaga'
import * as CyberBugs from './CyberBugs/UserCyberBugSaga'
import * as ProjectCategorySaga from './CyberBugs/ProjectCategorySaga'
import * as ProjectSaga from './CyberBugs/ProjectSaga'
import * as  PrioritySaga from './CyberBugs/PrioritySaga'
import * as TaskSaga from './CyberBugs/TaskSaga'
import * as StatusSaga from './CyberBugs/StatusSaga'
import * as CommentSaga from './CyberBugs/CommentSaga'
export function* rootSaga() {
    // yield fork(getTaskListApi) //none blocking chạy không cần chờ
    yield all([
        ToDoListSaga.takeActionGetTaskList(),
        ToDoListSaga.takeActionAddTask(),
        ToDoListSaga.takeActionDeleteTaskApi(),
        ToDoListSaga.takeActionDoneTaskApi(),
        ToDoListSaga.takeActionUndoTaskApi(),
        //Cyber Bug
        CyberBugs.followAction(),
        //Category
        ProjectCategorySaga.followAction(),
        //Project
        ProjectSaga.followAction(),
        //Priority
        PrioritySaga.followAction(),
        //Task Type
        TaskSaga.followAction(),
        //Status Saga
        StatusSaga.followAction(),
        //Comment 
        CommentSaga.followAction(),
    ])
}