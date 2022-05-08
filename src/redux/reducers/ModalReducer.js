import { HIDE_MODAL, OPEN_MODAL, SET_CALLBACK } from "../types/ModalType"
const initialState = {
    Component: <p>Default</p>,
    visible: false,
    callBackSubmit: '',
    title:'',
}

const ModalReducer = (state = initialState, action) => {
    const { Component, type, callback,title } = action;
    switch (type) {
        case OPEN_MODAL:
            return { ...state, Component: Component, visible: true,title:title }
        case HIDE_MODAL:
            return { ...state, visible: false }
        case SET_CALLBACK:
            return { ...state, callBackSubmit: callback }
        default: return { ...state }
    }

}

export default ModalReducer