import { call, put, takeLatest } from "redux-saga/effects";
import { cyberBugServices } from "../../../services/CyberBugServices";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import * as ProjectCategoryAction from '../../actions/ProjectCategoryAction'
import * as ProjectCategoryType from '../../types/ProjectCategoryType'


function * fetchCategoryApi(){
    try{
        let {data,status}=yield call(()=>{return cyberBugServices.fetchProjectCategory()})
        if(status===STATUS_CODE.SUCCESS){
            yield put(ProjectCategoryAction.actSetCategory(data.content))
        }
    }catch(err){
        console.log(err)
    }
}
export function * followAction(){
    yield takeLatest (ProjectCategoryType.FETCH_CATEGORY_API,fetchCategoryApi);
}