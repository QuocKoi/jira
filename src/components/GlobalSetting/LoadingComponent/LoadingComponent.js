import React, { Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styleLoading from './LoadingComponent.module.css'
export default function LoadingComponent() {
    const loading = useSelector(state => state.LoadingReducer.loading)
    if (loading) {
        return (
            <div className={styleLoading.bgLoading}>
                <img src={require(`../../../assets/img/loading/128x128.gif`)} />
            </div>
        )
    }else{
        return ''
    }
}
