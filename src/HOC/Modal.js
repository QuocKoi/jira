import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { actHideModal } from '../redux/actions/ModalAction';
import { NewDrawer } from '../JSS/Drawer';

export default function Modal() {
    const {visible,Component,callBackSubmit,title} = useSelector(state => state.ModalReducer);
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(actHideModal());
    };
    return (
        <>
            <NewDrawer title={title} placement="right" width='50%' onClose={() => { onClose() }} visible={visible}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={()=>{callBackSubmit()}} type="primary" htmlType='submit'>
                            Submit
                        </Button>
                    </Space>
                }
            >
                {Component}
            </NewDrawer>
        </>
    )
}
