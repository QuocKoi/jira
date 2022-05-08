import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, createFromIconfontCN } from '@ant-design/icons';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux'
import { actLoginApi } from '../../../redux/actions/CyberBugsAction';
import { NavLink } from 'react-router-dom'
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
function LoginCyberBug(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        history,
        isSubmitting
    } = props;
    return (
        <div className='d-flex justify-content-center align-items-center h-100  px-5'>
            <form onSubmit={handleSubmit}>
                <h4 className='text-center mb-4'>Login To Continue...</h4>
                <div className='mb-3'>
                    <Input type='email' value={values.email} name='email' placeholder="Email" prefix={<UserOutlined />} onChange={handleChange} />
                    <div className='text-danger'>{errors.email}</div>
                </div>
                <div className='mb-3'>
                    <Input.Password type='password' value={values.password} name='password' placeholder="Password" prefix={<LockOutlined />} onChange={handleChange} />
                    <div className='text-danger'>{errors.password}</div>
                </div>
                <Button htmlType='submit' type="primary" shape='round' size='large' className='w-100 mb-5'>Login</Button>
                <div className='social text-center mb-5'>
                    <p>Sign in with:</p>
                    <Button icon={<IconFont type="icon-facebook" />} type='primary' shape='circle' className='me-3'></Button>
                    <Button icon={<IconFont type="icon-twitter" />} type='primary' shape='circle'></Button>
                </div>
              <p>Don't have a account yet?<span  className='text-primary text-register ms-1'> <NavLink to='/register'>Register now</NavLink></span></p>
            </form>
        </div>
    )
}
const LoginCyberBugWithFormik = withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    // Custom sync validation
    handleSubmit: (values, { setSubmitting, props }) => {
        props.dispatch(actLoginApi(values))
    },
    validationSchema: Yup.object({
        email: Yup.string().required('Required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is invalid!'),
        password: Yup.string().required('Required').min(6, 'Password must be less 6 character')
    })
})(LoginCyberBug);

export default connect()(LoginCyberBugWithFormik);
