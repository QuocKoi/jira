
import { FETCH_CATEGORY_API, SET_CATEGORY } from "../types/ProjectCategoryType"
export const actSetCategory=(data)=>{
    return {
        type:SET_CATEGORY,
        data
    }
}



/*-------------------------------------Saga------------------------ */
export const actFetchCategoryApi=()=>{
    return {
        type:FETCH_CATEGORY_API
    }
}