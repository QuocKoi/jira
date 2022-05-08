import { applyMiddleware, combineReducers, createStore } from 'redux'
import ToDoListReducer from './reducers/ToDoListReducer'
import LoadingReducer from './reducers/LoadingReducer';
import ModalReducer from './reducers/ModalReducer';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import ProjectReducer from './reducers/ProjectReducer';
import reduxThunk from 'redux-thunk'
import { rootSaga } from './sagas/rootSaga';
import UserReducer from './reducers/UserReducer';
import PriorityReducer from './reducers/PriorityReducer';
import TaskTypeReducer from './reducers/TaskTypeReducer';
import StatusReducer from './reducers/StatusReducer'
import ModalTaskDetailReducer from './reducers/ModalTaskDetailReducer'
import CommentReducer from './reducers/CommentReducer'
//middleware Saga
import createSagaMiddleware from 'redux-saga';
const rootReducer = combineReducers({
    ToDoListReducer,
    LoadingReducer,
    ModalReducer,
    UserReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    PriorityReducer,
    TaskTypeReducer,
    StatusReducer,
    ModalTaskDetailReducer,
    CommentReducer

});
const middlewareSaga = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(reduxThunk, middlewareSaga));
//Gọi saga
middlewareSaga.run(rootSaga);

export default store