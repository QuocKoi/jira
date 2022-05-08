import { LOGIN_API} from "../types/CyberBugsType"
/*****************************Action***************************/




/*****************************ActionSaga***************************/
export const actLoginApi=(account)=>{
    return {
        type:LOGIN_API,
        account
    }
}
