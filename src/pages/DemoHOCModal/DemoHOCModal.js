import React from 'react'
import { useDispatch } from 'react-redux'
import SlideDown from '../../HOC/SlideDown';
import {  OPEN_MODAL } from '../../redux/types/ModalType';
import Login from '../Login/Login';
import Register from '../Register/Register';
export default function DemoHOCModal() {
    const dispatch = useDispatch();
    // const NewSlideDown=()=> SlideDown(Login)
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => dispatch({
                type: OPEN_MODAL,
                component:<Login/>
            })}>
                Login
            </button>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"onClick={() => dispatch({
                type: OPEN_MODAL,
                component:<Register/>
            })}>
                Register
            </button>
            <SlideDown Component={Login}/>
            
        </div>
    )
}
