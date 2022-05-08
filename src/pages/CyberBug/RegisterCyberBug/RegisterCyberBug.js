import React, { useState, useRef } from 'react'
import { Button, Form, Input } from 'antd'
import { NewFormItem } from '../../../JSS/Form'
import { NewSpace } from '../../../JSS/Space'
import { useDispatch } from 'react-redux'
import { actSignupApi } from '../../../redux/actions/UserAction'
export default function RegisterCyberBug() {
    const dispatch = useDispatch();
    const customValidate = (rule, value) => {
        // console.log(rule);
        // console.log(value);
        // console.log(callback);
        const { field } = rule;
        if (value === '' || value == undefined) {
            return Promise.reject(new Error('This field cannot be blank!'));
        } else {
            switch (field) {
                case "phoneNumber":
                    const regexPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
                    if (regexPhone.test(value)) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject(new Error('Phone number is invalid!'))
                    }
                case "email":
                    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (regexEmail.test(value)) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject(new Error('Email is invalid!'));
                    }
                case "passWord":
                    if (value.length < 6) {
                        return Promise.reject(new Error('Minimum length is 6 characters!'));
                    }
                    else {
                        return Promise.resolve();
                    }
                default:
                    return Promise.resolve();
            }
        }
    }
    const handleFinish = (values) => {
        const { email, name, passWord, phoneNumber } = values;
        dispatch(actSignupApi({
            email,
            passWord,
            name,
            phoneNumber
        }))
    }
    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <Form layout='vertical' onFinish={handleFinish} >
                <h3>Register</h3>
                <NewSpace>
                    <NewFormItem label='Name' name='name' rules={[{ validator: customValidate }]}>
                        <Input name='name' ></Input>
                    </NewFormItem>
                    <NewFormItem label='Phone' name='phoneNumber' hasFeedback rules={[{ validator: customValidate }]}>
                        <Input name='phoneNumber' ></Input>
                    </NewFormItem>
                </NewSpace>
                <NewFormItem label='Email' name='email' hasFeedback rules={[{ validator: customValidate }]}>
                    <Input name='email' ></Input>
                </NewFormItem>
                <NewFormItem label='Password' name='passWord' rules={[{ validator: customValidate }]}>
                    <Input.Password name='passWord' />
                </NewFormItem>
                <Button type="primary" className='w-100' htmlType="submit">
                    Register
                </Button>
            </Form>
        </div>
    )
}
