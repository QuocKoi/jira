import { Button, Form, Input } from 'antd'
import React, { Fragment, useEffect, useRef, useState, } from 'react'
import { NewFormItem } from '../../JSS/Form'
import { NewSpace } from '../../JSS/Space'
import { useSelector, useDispatch } from 'react-redux'
import { actEditUserApi } from '../../redux/actions/UserAction'
import { actSetCallback } from '../../redux/actions/ModalAction'
import _ from 'lodash'
import Notification from '../../components/Notification/Notification'
export default function FormEditUser() {
    const [values, setValues] = useState({
        id: '',
        passWord: '',
        email: '',
        name: '',
        phoneNumber: ''
    });
    const prevValuesRef = useRef({});
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { userId, name, phoneNumber, email } = useSelector(state => state.UserReducer.userEdit);
    prevValuesRef.current = { id: userId.toString(), passWord: '', email, name, phoneNumber }
    const customValidation = (rule, value) => {
        const { field } = rule;
        if (value === '' || value === undefined) {
            return Promise.reject(new Error('This field cannot be blank!'));
        } else {
            switch (field) {
                case 'phoneNumber':
                    const regexPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
                    if (!regexPhone.test(value)) {
                        return Promise.reject(new Error('Phone number is invalid!(+84)'));

                    } else {
                        return Promise.resolve();
                    }
                case 'email':
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
                default: return Promise.resolve();
            }
        }
    }
    useEffect(() => {
        form.setFieldsValue({
            id: userId,
            name,
            phoneNumber,
            email,
            passWord:''
        });
        setValues({ ...values, id: userId.toString(), passWord: '', email, name, phoneNumber })
    }, [userId]);
    useEffect(() => {
        dispatch(actSetCallback(handleSubmit))
    }, [values])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    const handleSubmit = (value) => {
        for(let key in values){
            if(values[key]===''){
                Notification('warning', 'Warning!', 'Vui lòng điền đầy đủ thông tin!')
                return;
            }
        }
        const check = _.isEqual(values, prevValuesRef.current);
        if (check) {
            Notification('warning', 'Warning!', 'Vui lòng thay đổi thông tin!')
        } else {
            dispatch(actEditUserApi(
                values
            ))
         
        }

    }
    return (
        <Fragment>
            <Form layout='vertical' form={form} name="control-hooks" onSubmitCapture={handleSubmit}>
                <NewSpace>
                    <NewFormItem label='Id' name='id' >
                        <Input disabled name='id' onChange={handleChange} />
                    </NewFormItem>
                    <NewFormItem label='Name' name='name' rules={[{ validator: customValidation,required:true }]} >
                        <Input name='name' onChange={handleChange} />
                    </NewFormItem>
                </NewSpace>
                <NewFormItem label='Phone number' hasFeedback name='phoneNumber' rules={[{ validator: customValidation,required:true }]} >
                    <Input name='phoneNumber' placeholder='+84' onChange={handleChange} />
                </NewFormItem>
                <NewFormItem label='Email' name='email' hasFeedback rules={[{ validator: customValidation,required:true }]} >
                    <Input name='email' onChange={handleChange} />
                </NewFormItem>
                <NewFormItem label='Password' name='passWord' rules={[{ validator: customValidation,required:true }]} >
                    <Input.Password name='passWord' onChange={handleChange} />
                </NewFormItem>
                <Button htmlType='submit'></Button>
            </Form>
        </Fragment>
    )
}
