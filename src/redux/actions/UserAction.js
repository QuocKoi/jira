import { GET_USER, SET_INFORMATION, SET_USER_LIST,DELETE_USER_API, SET_USER_EDIT, CHANGE_USER_EDIT, EDIT_USER_API } from "../types/UserType"
import {SIGNUP_API} from '../types/UserType'
export const actSetinform=(content)=>{
    return {
        type:SET_INFORMATION,
        content
    }
}
export const actSetUserList=(list)=>{
    return {
        type:SET_USER_LIST,
        list
    }
}
export const actSetUserEdit=(user)=>{
    return{
        type:SET_USER_EDIT,
        user
    }
}
/*****************************Saga***************************** */
export const actGetUser=(keyword)=>{
    return {
        type:GET_USER,
        keyword
    }
}
export const actSignupApi=(information)=>{
    return {
        type:SIGNUP_API,
        information
    }
}
export const actDeleteUserApi=(userId)=>{
    return {
        type:DELETE_USER_API,
        userId
    }
}
export const actEditUserApi=(data)=>{
    return {
        type:EDIT_USER_API,
        data
    }
}
