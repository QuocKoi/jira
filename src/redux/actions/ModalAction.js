import { HIDE_MODAL, OPEN_MODAL, SET_CALLBACK } from "../types/ModalType"

export const actOpenModal = (Component,title) => {
    return {
        type: OPEN_MODAL,
        Component,
        title
    }
}
export const actHideModal=()=>{
    return{
        type:HIDE_MODAL
    }
}
export const actSetCallback=(callback)=>{
    return {
        type:SET_CALLBACK,
        callback
    }
}