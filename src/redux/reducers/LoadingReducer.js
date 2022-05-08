import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType"

const initialState = {
    loading:false,
    
}

 const loadingReducer =(state = initialState, action) => {
  switch (action.type) {

  case DISPLAY_LOADING:
    return { ...state,loading:true }
  case HIDE_LOADING:
      return{...state,loading:false}
  default:
    return state
  }
}
export default loadingReducer
